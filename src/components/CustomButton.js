import React from 'react';

const CustomButton = ({ children }) => {
    return (
        <button className='btn btn-secondary text-white font-bold'>
            {children}
        </button>
    );
};

export default CustomButton;