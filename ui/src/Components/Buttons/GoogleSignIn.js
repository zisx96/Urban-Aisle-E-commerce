import React, { useCallback } from 'react'
import Google from '../../assets/img/Google.png'
import { API_BASE_URL } from '../../Api/constant'

const GoogleSignIn = () => {

  const handler = useCallback(() => {

    window.location.href = API_BASE_URL +"/oauth2/authorization/google";
  },[]);

  return (
    <button onClick={handler} className='flex justify-center items-center border w-full rounded border-gray-600 h-[48px] hover:bg-slate-50'>
        <img src={Google} alt='google logo' />
        <p className='px-2 text-gray-500'>Contiue With Google</p>
    </button>
  )
}

export default GoogleSignIn