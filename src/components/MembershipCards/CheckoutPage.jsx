
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

import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../Form/CheckoutForm';


// Load Stripe with your publishable key
const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutPage = () => {
  const { package_name } = useParams();

  return (
    <div className="checkout-page container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Checkout for {package_name.charAt(0).toUpperCase() + package_name.slice(1)} Package
      </h2>
      
      {/* Wrap your CheckoutForm in the Elements provider */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
