import React from 'react'
import FbIcon from '../common/FbIcon'
import InstaIcon from '../common/InstaIcon'

function Footer({content}) {
  return (
    <div className='bg-black text-white py-8'>
        <div className='flex justify-around p-2 '>
        {content?.items && content?.items?.map((item,index)=>{
                return (
                    <div className='flex flex-col'>
                    <p className='text-[16px] pb-[10px]'>{item?.title}</p>
                    {item?.list && item?.list?.map((listItem,index)=><a className='flex flex-col text-[12px] py-2'
                     href={listItem?.path}>{listItem?.label}</a>)}
                     {item?.description && <p>{item?.description}</p>}
                    </div>
                )
            })}
        </div>
        <div className='flex gap-2 items-center justify-center py-4'>
            <a href='/fb'><FbIcon/></a>
            <a href='/fb'><InstaIcon/></a>

        </div>
        <p className='text-sm text-white text-center content-center'>
            {content?.copright}
        </p>
    </div>
  )
}

export default Footer