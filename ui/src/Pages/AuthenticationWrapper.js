import React from 'react'
import Navigation from '../Components/Navigation/Navigation'
import { Outlet } from 'react-router-dom'
import bglogin from '../assets/img/bglogin.jpg'
import { useSelector } from 'react-redux'
import Spinner from '../Components/spinner/Spinner'

const AuthenticationWrapper = () => {

    const isLoading = useSelector((state) => state?.commonState?.loading);

  return (
    <div>
        <Navigation variant="authentication"/>
        <div className='flex'>
            <div className='w-[60%] lg:w-[70%] hidden md:inline py-2'>
               <img src={bglogin} className='bg-cover w-full bg-center rounded' alt='login'></img> 
            </div>
            <div>
                <Outlet />
            </div>
            {isLoading && <Spinner />}
        </div>
    </div>
  )
}

export default AuthenticationWrapper