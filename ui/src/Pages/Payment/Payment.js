import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import CheckoutPayment from './CheckoutPayment';

const stripePromise = loadStripe('');

const Payment = ({props}) => {

  const options = {

    mode: 'payment',
    amount: 10,
    currency: 'usd',
    apppearance: {
      theme: 'flat'
    },
  };

  return (
    <Elements stripe= {stripePromise} options={options}>
      <CheckoutPayment {...props}/>
    </Elements>
  )
}

export default Payment