import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/features/cart'
import {fetctUserDetails} from '../../Api/Userinfo'
import { setLoading } from '../../store/features/common'

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
        dispatch(setLoading(true))
        fetctUserDetails(res => {
            dispatch(setLoading(true));
            setUserInfo(res);
        }).catch(err => {

        }).finally(() => {
            dispatch(setLoading(false));
        })
    },[dispatch])

  return (
    <div className='p-8 flex '>
        <div className='w-[65%]'>
            <div>
                {/* Address */}
                <p>Delivery Address</p>
                
            </div>
        </div>
        <div className='w-[35%] p-4 flex flex-col gap-4 border rounded-lg border-gray-500'>
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