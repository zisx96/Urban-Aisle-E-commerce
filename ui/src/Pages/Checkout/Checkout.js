import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/features/cart'
import { setLoading } from '../../store/features/common'
import { fetctUserDetails } from '../../Api/Userinfo'

const Checkout = () => {

    const cartItems = useSelector(selectCartItems);

    const dispatch = useDispatch();

    const [userInfo, setUserInfo] = useState([]);

    const subTotal = useMemo(() => {
            let value = 0;
            cartItems?.forEach(element =>{
                value += element?.subTotal
            });
            return value;
        },[cartItems]);

    useEffect(() => {
        dispatch(setLoading(true));
        fetctUserDetails().then(res => {
            setUserInfo(res);
        }).catch(err => {

        }).finally(() => {
            dispatch(setLoading(false));
        })
        
    },[dispatch])

  return (
    <div className='p-8 flex '>
        <div className='w-[65%]'>
            <div className='flex gap-8 mb-4'>
                {/* Address */}
                <p className='font-bold'>Delivery Address</p>
                {userInfo?.addressList && 
                <div>
                    <p>{userInfo?.addressList?.[0]?.name}</p>
                    <p>{userInfo?.addressList?.[0]?.street}</p>
                    <p>{userInfo?.addressList?.[0]?.city}, {userInfo?.addressList?.[0]?.state},{userInfo?.addressList?.[0]?.zipCode}</p>
                </div>} 
            </div>
            <div className='h-[2px] bg-gray-300 w-[90%] m-4 rounded-lg '></div>
            <div className='flex mt-2 gap-4 flex-col'>
                {/* Delivery */}
                <p className='font-bold'>Choose Delivery</p>
                <div>
                    <p>Select a Day</p>
                    <div className='flex gap-2 mt-4'>
                        <div className='w-[80px] h-[48px] flex flex-col justify-center border text-center mb-4 rounded-lg mr-4 cursor-pointer
                        hover:scale-110 hover:bg-gray-200 border-gray-500 text-black'
                        ><p className='text-center'>{'Feb 8th'}</p></div>  

                        <div className='w-[80px] h-[48px] flex flex-col justify-center border text-center mb-4 rounded-lg mr-4 cursor-pointer
                   hover:scale-110 hover:bg-gray-200  border-gray-500 text-black'
                        ><p className='text-center'>{'Feb 11th'}</p></div>  
                    </div>
                </div>
            </div>
            <div className='h-[2px] bg-gray-300 w-[90%] m-4 rounded-lg '></div>
            <div className='flex flex-col mt-2 gap-2'>
                {/* Payment */}
                <p className='font-bold'>Payment Method</p>
                <div className='mt-4 flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <input type='radio' name='payment' />
                        <p>Credit/Debit</p>
                    </div>
                    <div className='flex gap-2'>
                        <input type='radio' name='payment' />
                        <p>UPI/Wallet</p>
                    </div>
                    <div className='flex gap-2'>
                        <input type='radio' name='payment' />
                        <p>Cash On Delivery</p>
                    </div>
                </div>    
            </div>
            <button className='bg-black mt-6 text-white w-[120px] h-[48px] border rounded-lg hover:bg-gray-500'>Pay Now</button>
        </div>
        <div className='w-[35%] h-[35%] p-4 flex flex-col gap-4 border rounded-lg border-gray-500'>
            <p className='font-bold'>Order Summary</p>
            <p className='font-bold'>Items Count - {cartItems?.length}</p>
            <p className='font-bold'>SubTotal - ${subTotal}</p>
            <p className='font-bold'>Shipping - FREE</p>
            <hr className='h-[2px] bg-gray-500' />
            <p className='font-bold'>Total Amount - ${subTotal}</p>
        </div>
    </div>
  )
}

export default Checkout