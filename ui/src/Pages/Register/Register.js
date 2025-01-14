import React from 'react'
import { useState, useCallback } from 'react';
import { setLoading } from '../../store/features/common';
import { registerAPI } from '../../Api/Authentication';
import GoogleSignIn from '../../Components/Buttons/GoogleSignIn';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import VerifyCode from './VerifyCode';

const Register = () => {
  
  const [values, setValues] = useState({
    email:'',
    password:'',
    firstName:'',
    lastName:'',
    phone:''
  });

  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const [enableVerify, setEnableVerify] = useState(false);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("values", values);
    setError('');
    dispatch(setLoading(true));
    registerAPI(values).then(res => {
      if(res?.code === 200){
        setEnableVerify(true);
      }
    }).catch(err => {
      setError("Invalid! or Email already Exists");
    }).finally(() => {
      dispatch(setLoading(false));
    })
    
    
  },[dispatch, values]);

  const handler = useCallback((e) => {
    e.persist();
    setValues(values=> ({
      ...values,
      [e.target.name]: e.target?.value,
    }))
  },[]);

  return (
    <div className='px-8 w-full lg:w-[70%]'>
      {!enableVerify && 
      <>
      <p className='text-3xl font-bold pb-4 pt-4'>Sign Up</p>
      <GoogleSignIn />
      <p className='text-gray-500 items-center text-center w-full py-2'>or</p>
      
      <div className='pt-4'>
        <form onSubmit={onSubmit} autoComplete='off' >
          <label className=''>Email Address</label>
          <input type='email' name='email' value={values?.userName} placeholder='Email Address' onChange={handler} className='h-[48px] w-full px-2 py-4 mt-2 mb-4 border border-gray-500' required autoComplete='off'/>
          <label className=''>Password</label>
          <input type='password' name='password' value={values?.password} placeholder='Password' onChange={handler} className='h-[48px] w-full mt-2 p-2 border border-gray-500' require autoComplete='new-password'/>
          <button className='border rounded-lg w-full h-[48px] mb-4 bg-black text-white mt-4 hover:opacity-80'>Sign Up</button>
        </form>
      </div>
      {error && <p className=' pt-2 text-left text-lg text-red-400'>{error}</p>}
      <Link to={"/v1/login"} className='underline text-gray-500 hover:text-black'>Already have an account? Login</Link>
      </>
      }
      {enableVerify && <VerifyCode email={values?.email} />}
    </div>

  )
}

export default Register