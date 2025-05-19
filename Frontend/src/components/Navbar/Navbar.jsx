import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom'
import MenuDrawer from '../Drawer/MenuDrawer';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();
    const onLogout = () => {
        localStorage.clear();
        localStorage.removeItem("token")
        navigate("/login");
    }

    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery)
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    }

    return (
        <div className='bg-apricot flex items-center justify-between px-6 py-2 drop-shadow'>
            <div className='flex items-center justify-between gap-3'>
                {/* <Drawer>
                    <MenuIcon className='text-leather cursor-pointer hover:text-leather' />
                </Drawer> */}
                <MenuDrawer>
                    <MenuIcon />
                </MenuDrawer>
                <h2 className='text-xl font-medium py-2 text-leather'>Notes</h2>
            </div>

            <SearchBar value={searchQuery} onChange={({ target }) => {
                setSearchQuery(target.value);
            }} handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
    )
}

export default Navbar