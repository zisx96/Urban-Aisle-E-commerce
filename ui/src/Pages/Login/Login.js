import React, { useCallback, useState } from 'react'
import GoogleSignIn from '../../Components/Buttons/GoogleSignIn'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { loginAPI } from '../../Api/Authentication';
import { saveToken } from '../../Utils/jwt-helper';

const Login = () => {

  const [values, setValues] = useState({
    userName:'',
    password:''
  });

  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("values", values);
    setError('');
    dispatch(setLoading(true));
    loginAPI(values).then(res => {
      if(res?.token){
        saveToken(res?.token);
        navigate('/')
      }
      else {
        setError("Something Went Wrong!");
      }
    }).catch(err => {
      // to-do Display error
      setError("Invalid Credentials!");
    }).finally(() => {
      dispatch(setLoading(false));
    });
    
  },[dispatch, navigate, values]);

  const handler = useCallback((e) => {
    e.persist();
    setValues(values=> ({
      ...values,
      [e.target.name]: e.target?.value,
    }))
  },[])

  return (
    <div className='px-8 w-full lg:w-[70%]'>
      <p className='text-3xl font-bold pb-4 pt-4'>Sign In</p>
      <GoogleSignIn />
      <p className='text-gray-500 items-center text-center w-full py-2'>or</p>
      
      <div className='pt-4'>
        <form onSubmit={onSubmit} >
          <input type='email' name='userName' value={values?.userName} placeholder='Email Address' onChange={handler} className='h-[48px] w-full p-2 border border-gray-500' required/>
          
          <input type='password' name='password' value={values?.password} placeholder='Password' onChange={handler} className='h-[48px] w-full mt-6 p-2 border border-gray-500' require autoComplete='new-password'/>

          <Link className='text-right w-full float-right underline pt-2 text-gray-500 hover:text-black'>Forgot Password</Link>
          <button className='border rounded-lg w-full h-[48px] mb-4 bg-black text-white mt-4 hover:opacity-80'>Sign In</button>
        </form>
      </div>
      {error && <p className='text-right text-lg text-red-400'>{error}</p>}
      <Link to={"/v1/register"} className='underline text-gray-500 hover:text-black'>Don’t have an account? Sign up</Link>
    </div>

  )
}

export default Login