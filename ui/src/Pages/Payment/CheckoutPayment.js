import React, { useCallback, useState } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/features/cart'
import { createOrderRequest } from '../../Utils/Order.util'
import { placeOrderApi } from '../../Api/Order'
import { setLoading } from '../../store/features/common'

const CheckoutPayment = ({userId, addressId}) => {

    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);

    const [error,setError] = useState('');

    const [orderResponse, setOrderResponse] = useState();

    const handleSubmit = useCallback(async (event) => {
        event?.preventDefault();

        const orderRequest = createOrderRequest(cartItems, userId, addressId);
        console.log("Order Request: ", orderRequest);
        
        dispatch(setLoading(true));
        setError('');
        setOrderResponse({});

        const {error} = await elements.submit();
        if (error?.message) {
          setError(error?.message);
          dispatch(setLoading(false));
          return;
        }

        if(elements){
          placeOrderApi(orderRequest).then(async res=>{
          setOrderResponse(res);
          stripe.confirmPayment({
            elements,
            clientSecret: res?.credentials?.client_secret,
            
            confirmParams:{
                payment_method:'pm_card_visa',
                return_url:'http://localhost:3000/confirmPayment'
            }
        }).then(res=>{
            console.log("Response ",res);
      })    
        
    }).catch(err=>{

    }).finally(()=>{
        dispatch(setLoading(false));
    })

    }    
    },[userId, addressId, cartItems,stripe,dispatch, elements])

  return (
    <form className='items-center p-2 mt-4 w-[320px] h-[320px]' onSubmit={handleSubmit}>
        <PaymentElement />
        <button type='submit' disabled={!stripe} onClick={handleSubmit} className='bg-black mt-6 text-white w-[120px] h-[48px] border rounded-lg hover:bg-gray-500'>Pay Now</button>
    </form>
  )
}

export default CheckoutPayment