import React, { useCallback } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/features/cart'
import { createOrderRequest } from '../../Utils/Order.util'

const CheckoutPayment = ({userId, addressId}) => {

    const stripe = useStripe();
    const element = useElements();

    const cartItems = useSelector(selectCartItems);

    const handleSubmit = useCallback((event) => {
        event?.preventDefault();

        const orderRequest = createOrderRequest(cartItems, userId, addressId);
        console.log("Order Request: ", orderRequest);
        
    },[userId, addressId, cartItems])

  return (
    <form className='items-center p-2 mt-4 w-[320px] h-[320px]'>
        <PaymentElement />
        <button disabled={!stripe} onClick={handleSubmit} className='bg-black mt-6 text-white w-[120px] h-[48px] border rounded-lg hover:bg-gray-500'>Pay Now</button>
    </form>
  )
}

export default CheckoutPayment