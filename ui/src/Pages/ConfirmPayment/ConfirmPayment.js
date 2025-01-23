import { useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { confirmPaymentApi } from '../../Api/Order';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/features/common';
import Spinner from '../../Components/spinner/Spinner';

const ConfirmPayment = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const [errorMessage,setErrorMessage] = useState('');
    const isLoading = useSelector((state) => state?.commonState?.loading);
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const client_secret = query.get('payment_intent_client_secret');
        const redirectStatus = query.get('redirect_status');
        const paymentIntent = query.get('payment_intent')

        if(redirectStatus === 'succeeded'){
            dispatch(setLoading(true));
            confirmPaymentApi({
                paymentIntent: paymentIntent,
                status:paymentIntent,
            }).then(res => {
                const orderId = res?.orderId;
                navigate(`/orderConfirmed?.orderId=${orderId}`);
            }).catch(err => {
                setErrorMessage("Something went wrong!");
            }).finally(() => {
                dispatch(setLoading(false));
            })

        }else {
            setErrorMessage('Payment Failed -'+ redirectStatus);
        }
    },[location.search, dispatch, navigate])

  return (
    <>
        <div>
            Processing Payment...
        </div>
        {isLoading && <Spinner />}
    </>
  )
}

export default ConfirmPayment