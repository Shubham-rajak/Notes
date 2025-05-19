import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axiosInstance from '../../utils/axiosInstance'

const Trash = () => {
    const [userInfo, setUserInfo] = useState(null);


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
                
            </div>
        </>
    )
}

export default Trash