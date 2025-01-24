import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { addAddressApi } from '../../Api/Userinfo';
import { saveAddress } from '../../store/features/user';

const AddAddress = ({onCancel}) => {
    
    const [values,setValues] = useState({
        name:'',
        phoneNumber:'',
        street:'',
        city:'',
        state:'',
        zipCode:''
    });

    const [error, setError] = useState('');
    const dispatch = useDispatch();
    
    const onSubmit = useCallback((event) => {
        event.preventDefault();
        dispatch(setLoading(true));
        setError('');
        addAddressApi(values).then(res => {
            dispatch(saveAddress(res));
            onCancel && onCancel();
        }).catch(err => {
            setError('Address was not added.')
        }).finally(() => {
            dispatch(setLoading(false));
        })
    },[dispatch, onCancel, values]);

    const handler = useCallback((e) => {
        e.persist();
        setValues(values=> ({
          ...values,
          [e.target.name]: e.target?.value,
        }))
    },[]);

  return (
    <div>
        <p className='text-xl pt-4 pb-4'>Add Address </p>
        <form onSubmit={onSubmit} className='pt-2 mb-2 md:w-[420px] w-full'>
            <label>Full Name</label>
            <input type='text' name='name' value={values?.name} onChange={handler} placeholder='person name'
            className='w-full border rounded-lg p-2 py-2 my-2 border-gray-400' required
            />
            <label>Phone</label>
            <input type='number' name='phoneNumber' value={values?.phoneNumber} onChange={handler} placeholder='person phone'
            className='w-full border rounded-lg p-2 py-2 my-2 border-gray-400' required
            />
            <label>Address</label>
            <input type='text' name='street' value={values?.street} onChange={handler} placeholder='street'
            className='w-full border rounded-lg p-2 py-2 my-2 border-gray-400' required
            />
            <div className='flex gap-4'>
               
                <input type='text' name='city' value={values?.city} onChange={handler} placeholder='city'
                className='w-full border rounded-lg p-2 py-2 my-2 border-gray-400' required
                />
                
                <input type='text' name='state' value={values?.state} onChange={handler} placeholder='state'
                className='w-full border rounded-lg p-2 py-2 my-2 border-gray-400' required
                />
            </div>
            
                <input type='text' name='zipCode' value={values?.zipCode} onChange={handler} placeholder='zipCode'
                className='w-full border rounded-lg p-2 py-2 my-2 border-gray-400' required
                />
            
            <div className='flex gap-4 mt-4'>
                <button onClick={onCancel} type='button' className='rounded-lg w-[120px] h-[42px] border-2 border-gray-400'>
                    Cancel</button>

                <button type='submit' className='bg-black text-white rounded-lg w-[120px] h-[42px] border-2 border-gray-400'>
                    Save</button>
            </div>
        </form>
        {error && <p className='text-lg text-red-600'>{error}</p>}
    </div>
  )
}

export default AddAddress