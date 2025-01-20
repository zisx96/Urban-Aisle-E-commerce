import React, { useCallback } from 'react'
import { logOut } from '../../Utils/jwt-helper';
import { useNavigate } from 'react-router-dom';

const Account = () => {

    const navigate = useNavigate();

    const onLogout = useCallback(() => {
        logOut();
        navigate('/')
    },[navigate]);

  return (
    <div className='p-8'>
        <p className='text-lg font-bold'>Account Details</p>
        <button onClick={onLogout} className='bg-black text-white w-[140px] h-[48px] border rounded-lg hover:bg-gray-500'>
            Logout</button>
    </div>
  )
}

export default Account