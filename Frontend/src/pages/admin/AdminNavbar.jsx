import React from 'react'

const AdminNavbar = () => {
    return (
        <>
            <div className='bg-apricot flex items-center justify-between px-6 py-2 drop-shadow'>
                <h2 className='text-xl font-medium py-2 text-leather'>Admin</h2>
                <ul>
                    <li><a href="">User</a></li>
                </ul>
                <div className='flex bg-vista_blue p-1.5 rounded-md items-center hover:bg-leather transition-all gap-3'>
                    <button className='text-sm text-light_tan hover:text-apricot'>Logout</button>
                </div>
            </div>
        </>
    )
}

export default AdminNavbar