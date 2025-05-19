import React, {useState} from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({notedata, type, getAllNotes,onClose}) => {
    const [title, setTitle] = useState(notedata?.title || "");
    const [content, setContent] = useState(notedata?.content || "");
    const [tags, setTags] = useState(notedata?.tags || []);
    const [error, setError] = useState(null);
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/createnote", {
                title,
                content,
                tags
            })
            if(response.data && response.data.note){
                getAllNotes();
                onClose()
            }
        } catch (error) {
            if (
                error.response &&
                error.response.note &&
                error.response.notes.message
            ) {
                setError(error.response.notes.message)
            }
        }
    }
    const editNote = async () => {
        const noteId = notedata._id
        try {
            const response = await axiosInstance.put("/updatenotes/"+noteId, {
                title,
                content,
                tags
            })
            if(response.data && response.data.note){
                getAllNotes();
                onClose()
            }
        } catch (error) {
            if (
                error.response &&
                error.response.note &&
                error.response.notes.message
            ) {
                setError(error.response.notes.message)
            }
        }
    }

    const handleAddNote = () => {
        if(!title){
            setError("Please enter title");
            return;
        }
        if(!content){
            setError("Please enter content");
            return;
        }
        setError("");
        if(type === "edit"){
            editNote()
        }else{
            addNewNote()
        }
    }

    return (
        <div className='relative'>
            <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-white transition-all ease-in-out' onClick={onClose}>
                <MdClose className='text-xl text-red-700' />
            </button>
            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input type="text" className='text-2xl text-leather outline-none rounded bg-apricot' placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>CONTENT</label>
                <textarea type="text" className='text-sm text-vista_blue outline-none bg-light_tan p-2 rounded' placeholder='Enter Content' rows={10} value={content} onChange={(e) => setContent(e.target.value)} />
            </div>

            <div className='mt-3'>
                <label className='input-label'>TAGS</label>
                <TagInput tags={tags} setTags={setTags}/>
            </div>

            {error && <p className='text-sm text-red-500'>{error}</p>}

            <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
                {type === 'edit' ? 'UPDATE' : 'ADD' }
            </button>
        </div>
    )
}

export default AddEditNotes