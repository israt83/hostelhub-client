
// import { useParams } from 'react-router-dom';

// const CheckoutPage = () => {
//   const { package_name } = useParams();

//   return (
//     <div className="checkout-page container mx-auto px-4 sm:px-8 py-8">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Checkout for {package_name.charAt(0).toUpperCase() + package_name.slice(1)} Package
//       </h2>
//       {/* Add your checkout form or details here */}
//     </div>
//   );
// };

// export default CheckoutPage;


import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Load Stripe with your public key
const stripePromise = loadStripe('your_stripe_public_key_here');

const CheckoutForm = ({ packageName, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Get clientSecret from the server for the package price
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post('/create-payment-intent', { price });
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        setError('Failed to initialize payment.');
      }
    };
    createPaymentIntent();
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'User Name', // You can get the logged-in user name here
          },
        },
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        // Save payment data and update user badge in DB
        await axios.post('/save-payment', {
          packageName,
          amount: paymentIntent.amount,
          transactionId: paymentIntent.id,
        });
        setError('');
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement className="p-4 border" />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="btn-primary mt-4" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {success && <p className="text-green-500">Payment successful!</p>}
    </form>
  );
};

const CheckoutPage = () => {
  const { package_name } = useParams();
  const packageDetails = {
    silver: { name: 'Silver', price: 10 },
    gold: { name: 'Gold', price: 20 },
    platinum: { name: 'Platinum', price: 30 },
  };

  const selectedPackage = packageDetails[package_name];

  return (
    <div className="checkout-page container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Checkout for {selectedPackage.name} Package
      </h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm packageName={selectedPackage.name} price={selectedPackage.price} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;