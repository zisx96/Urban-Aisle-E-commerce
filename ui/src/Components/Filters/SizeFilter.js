import React, { useEffect } from 'react'
import { useState } from 'react';
import { useCallback } from 'react';

const SizeFilter = ({sizes, hideTitle, multi=true, onChange}) => {
    
    const [appliedSize, setAppliedSize] = useState([]);
    const onClickDiv = useCallback((item) => {
        
        if(appliedSize.indexOf(item) > -1){
            
            setAppliedSize(appliedSize?.filter(size => size !== item));
        }
        else {
            if(multi){
                setAppliedSize([...appliedSize,item]);
            }
            else {
                setAppliedSize([item]);
            }
        }
    },[appliedSize,multi])

    useEffect(()=> {
        onChange && onChange(appliedSize);
    },[appliedSize,onChange])

  return (
    <div className={`flex  flex-col mb-4 ${hideTitle?'':'mb-4'} `}>
    { !hideTitle && <p className='text-[16px] text-black mt-6 mb-1'>Size</p>}
    <div className='flex flex-wrap mt-2'>
        {sizes?.map(item => {
            return (
                <div className='flex flex-col p-2'>
                    <div className='w-[50px] text-center  h-8 border-2 rounded-lg mr-4 cursor-pointer hover:outline-2 hover:scale-90 bg-white border-gray-500 text-gray-500'
                    style={appliedSize.includes(item)? {
                        background:'black',
                        color:'white'
                    }:{}} onClick={() => onClickDiv(item)}>{item}</div>                
                </div>
            )
        }  )}
    </div>
    </div>
  )
}

export default SizeFilter
