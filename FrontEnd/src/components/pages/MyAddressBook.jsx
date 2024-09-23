import React from 'react';

const MyAddressBook = () => {
    return (
        <div>
            <h1 className="text-xl font-bold p-4">(Default Address)</h1>
            <div className='flex text-center'>
                <button className='ml-4 mr-4 font-bold hover:text-gray-500'>
                    Edit
                </button>
                <button className="ml-4 font-bold hover:text-gray-500">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default MyAddressBook;
