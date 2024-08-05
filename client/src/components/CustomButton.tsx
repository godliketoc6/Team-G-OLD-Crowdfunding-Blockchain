import React from 'react'

interface CustomButton {
    title: string;
    handleClick: () => void;
}


const CustomButton = ({ title, handleClick } : CustomButton) => {
    return (
        <button
            className='btn btn-primary text-lg'
            onClick={handleClick}
        >
            {title}
        </button>
    )
}

export default CustomButton