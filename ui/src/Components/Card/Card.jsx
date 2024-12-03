import React from 'react'
import ArrowIcon from '../common/ArrowIcon'

const Card = ({imagePath, title, description, actionArrow, height, width}) => {
  return (
    <div className='flex flex-col p-8'>
        <img className="bg-cover bg-center border rounded hover:scale-105 cursor-pointer" 
        style={{ height: height || '300px', maxHeight: height || '360px', width: width || '240px' }} 
        src={imagePath}  
        alt="jeans1"/>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col '>
          <p className='text-[16px] p-2'>{title}</p>
          {description && <p className='text-[12px] px-2 text-gray-600'>{description}</p>}
        </div>
        {actionArrow && <span className='cursor-pointer pr-2 items-center'><ArrowIcon/></span>}
      </div>
    </div>
  )
}

export default Card