import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import CheckoutPayment from './CheckoutPayment';

const stripePublishableKey = process.env.STRIPE_KEY || '';

const stripePromise = loadStripe(stripePublishableKey);

const Payment = (props) => {

  const options = {

    mode: 'payment',
    amount: 100,
    currency: 'usd',
    appearance: {
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