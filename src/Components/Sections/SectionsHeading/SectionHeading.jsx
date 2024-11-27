import React from 'react'

function SectionHeading({title}) {
  return (
    <div className='flex mt-3 flex-wrap px-12 items-center gap-2'>
        <div className='border-2xl rounded border-1 bg-black w-2 h-10'>

        </div>
        <p className='px-5 font-serif text-3xl'>{title}</p>
    </div>
  )
}

SectionHeading.defaultProps = {

}

SectionHeading.prototype = {

    title:String
}

export default SectionHeading