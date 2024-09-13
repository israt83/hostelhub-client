
import { useParams } from 'react-router-dom';

const CheckoutPage = () => {
  const { package_name } = useParams();

  return (
    <div className="checkout-page container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Checkout for {package_name.charAt(0).toUpperCase() + package_name.slice(1)} Package
      </h2>
      {/* Add your checkout form or details here */}
    </div>
  );
};

export default CheckoutPage;
