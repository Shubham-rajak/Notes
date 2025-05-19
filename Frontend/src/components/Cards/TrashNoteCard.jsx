import React from 'react'
import { MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment';

const TrashNoteCard = () => {

    const onEdit = () => {}

    const onDelete = () => {}

    return (
        <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-sm font-medium'>Test</h6>
                    <span className='text-xs text-vista_blue'>'DD-MM-YYYY'</span>
                </div>
            </div>
            <p className='text-xs text-leather mt-2'>This is a test note</p>
            <div className='flex items-center gap-2 justify-between'>
                <div className='text-xs text-light_tan'>#tag1 #tag2</div>
                <div className='flex items-center gap-2'>
                    <MdCreate className='text-leather cursor-pointer icon-btn hover:text-apricot' onClick={onEdit} />
                    <MdDelete className='text-red-600 cursor-pointer icon-btn hover:text-apricot' onClick={onDelete} />
                </div>
            </div>
        </div>
    )
}

export default TrashNoteCard