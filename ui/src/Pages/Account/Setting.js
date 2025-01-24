import React from 'react'
import { useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { logOut } from "../../Utils/jwt-helper";

const Setting = () => {

  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    logOut();
    navigate("/");
  }, [navigate]);

  return (
    <div>
        <button onClick={onLogout} className='bg-black text-white w-[140px] h-[48px] border rounded-lg hover:bg-gray-500'>
            Logout
        </button>
    </div>
  )
}

export default Setting