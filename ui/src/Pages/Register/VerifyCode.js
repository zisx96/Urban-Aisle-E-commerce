import React from 'react'
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { verifyAPI } from '../../Api/Authentication';

const VerifyCode = ({email}) => {
    const [values, setValues] = useState({
        userName: email,
        code: "",
      });
    
      const [error, setError] = useState("");
    
      const dispatch = useDispatch();

      const [message,setMessage] = useState('');
    
      const onSubmit = useCallback(
        (e) => {
          e.preventDefault();
          console.log("values", values);
          setError("");
          dispatch(setLoading(true));
          verifyAPI(values).then(res => {
            setMessage('Thank you! Your email has been successfully verified. You can now log in to your account.')
          }).catch(err => {
            setError('The verification code you entered is incorrect or has expired.');
          }).finally(() => {
            dispatch(setLoading(false));
          })
          
        },
        [dispatch, values ]
      );
    
      const handler = useCallback((e) => {
        e.persist();
        setValues((values) => ({
          ...values,
          [e.target.name]: e.target?.value,
        }));
      }, []);
    
      return (
    
        <div className='p-4'>
          {!message && 
            <>
            <p className='text-lg text-gray-700'>Registration Successfull !<br/> Please check your email for the verification code</p>
            <p className='text-lg text-gray-600'>Enter the 6-digit verification code</p>
            <form onSubmit={onSubmit} className='flex flex-col gap-4'> 
              <input type='text' name='code' value={values?.code} maxLength={6} onChange={handler} placeholder='6-digit code'
              className='h-[48px] border-gray-600 p-2 mt-4' required/>
              <button type='submit' className='border w-[120px] rounded-lg h-[48px] bg-black text-white mb-4'>Verify</button>
            </form>
            {error && <p className='text-xl text-red-500'>{error}</p>}
            </>
          }
          {message && <p className='text-lg'>{message}</p>}
        </div>
      );
}

export default VerifyCode