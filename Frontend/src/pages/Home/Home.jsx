import { useState, useEffect } from 'react'
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import axiosInstance from '../../utils/axiosInstance'
import AddEditNotes from './AddEditNotes'
import { useNavigate } from 'react-router-dom'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNotesImg from '../../assets/images/add-note.svg'

const Home = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null
    })

    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);

    const [isSearch, setIsSearch] = useState(false);

    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
    }

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/getuser")
            if (response.data && response.data.user) {
                setUserInfo(response.data.user)
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login")
            }
        }
    }

    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/getallnotes")
            console.log(response.data.notes)
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes)
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again")
        }
    }

    const deleteNote = async (data) => {
        const noteId = data._id;
        try {
            const response = await axiosInstance.delete("/deletenotes/" + noteId)
            if (response.data && !response.data.error) {
                showToastMessage("Note deleted successfully", 'delete')
                getAllNotes();
            }
        } catch (error) {
            if (
                error.response &&
                error.response.note &&
                error.response.note.message
            ) {
                console.log("An unexpected error occurred. Please try again")
            }
        }
    }

    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get("/searchnotes", {
                params: { query },
            });

            if(response.data && response.data.notes){
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClearSearch = () => {
        setIsSearch(false);
        getUserInfo()
    }

    useEffect(() => {
        getAllNotes();
        getUserInfo();
    }, [])


    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
            <div className='container mx-auto'>
                {allNotes.length > 0 ? <div className='grid sm:grid-cols-3 gap-4 mt-8 p-2 grid-cols-1'>
                    {allNotes.map((item, index) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.date}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteNote(item)}
                            onPinNote={() => { }}
                        />
                    ))}
                </div> : (
                    <EmptyCard imgSrc={AddNotesImg} message={`Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`} />
                )}
            </div>

            <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-apricot hover:bg-light_tan fixed right-10 bottom-10 transition-all ease-in-out hover:text-apricot' onClick={() => {
                setOpenAddEditModal({ isShown: true, type: "add", data: null })
            }}>
                <MdAdd className='text-[32px] text-white' />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                }}
                contentLabel=''
                className="w-[40%] max-h-3/4 bg-apricot rounded-md mx-auto mt-14 p-5 overflow-auto"
            >
                <AddEditNotes type={openAddEditModal.type} notedata={openAddEditModal.data} onClose={() => { setOpenAddEditModal({ isShown: false, type: "add", data: null }) }} getAllNotes={getAllNotes} />
            </Modal>
        </>
    )
}

export default Home