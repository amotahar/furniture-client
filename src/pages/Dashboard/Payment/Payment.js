import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData , useNavigation} from 'react-router-dom';

import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import Spinner from '../../../utils/Spinner';
import useTitle from '../../../hooks/useTitle';



//!stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);


const Payment = () => {
    useTitle('Payment');
    const booking = useLoaderData();
    const { productName, price, category } = booking;
    const navigation = useNavigation();


    if (navigation.state === "loading") {
        return <Spinner></Spinner>
    }
    return (
        <div>
            <h3 className="text-3xl mb-2 text-center font-bold mt-2 text-primary ">Payment for <span className='text-secondary '>{productName}</span></h3>
            <p className="text-lg text-center mb-2">Please pay <span className='mr-1 text-base font-black'>৳</span><strong>{price}</strong> for your product of {category} Category.</p>


            

            <div className="card w-80 h-24  bg-yellow-400 text-primary-content mx-auto animate-pulse cursor-pointer">
                <div className="p-2 mx-2 text-center">

                    <h2 className="text-lg text-secondary font-bold text-center ">Test Payment</h2>












                    <p className='text-base text-secondary '>Card number: <span className='font-bold'>4242 4242 4242 4242</span> </p>
                    <p className=' text-secondary '>MM/YY: <span className='font-bold'>06/26</span> CVC: <span className='font-bold'>123</span> ZIP: <span className='font-bold'>45678</span> </p>


                </div>
            </div>









            <p className="text-xl text-center mb-2 text-secondary font-bold">Your Payment Information is here...</p>
            






            <div className='w-full lg:w-3/5 mx-auto border-2 p-10 shadow-lg rounded-lg bg-gray-100 border-primary'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                    booking={booking}
                    />
                </Elements>
            </div>




        </div>
    );
};

export default Payment;