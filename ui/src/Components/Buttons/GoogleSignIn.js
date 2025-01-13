import React from 'react'
import Google from '../../assets/img/Google.png'

const GoogleSignIn = () => {
  return (
    <button className='flex justify-center items-center border w-full rounded border-gray-600 h-[48px] hover:bg-slate-50'>
        <img src={Google} alt='google logo' />
        <p className='px-2 text-gray-500'>Contiue With Google</p>
    </button>
  )
}

export default GoogleSignIn