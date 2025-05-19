import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TrashNoteCard from '../../components/Cards/TrashNoteCard'
import axiosInstance from '../../utils/axiosInstance'
import emptytrash from '../../assets/images/empty-trash.svg'

const Trash = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [allTrashNotes, setAllTrashNotes] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

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
    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get("/searchnotes", {
                params: { query },
            });

            if (response.data && response.data.notes) {
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
        getUserInfo();
    }, [])
    

    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-4 px-2'>
                    <TrashNoteCard />
                </div>
            </div>
        </>
    )
}

export default Trash