import { Link } from 'react-router-dom';

const MembershipCards = () => {
  const packages = [
    { name: 'Silver', price: '$10', description: 'Basic membership with essential features.' },
    { name: 'Gold', price: '$20', description: 'Premium membership with additional features.' },
    { name: 'Platinum', price: '$30', description: 'Ultimate membership with all features included.' },
  ];

  return (
   <div className='mt-16 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
    <h1 className='text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl'>Upgrade Your Membership</h1>
    <p className='text-center py-6 text-gray-500'>Unlock exclusive benefits by upgrading to a premium package! <br /> Choose from our Silver, Gold, or Platinum membership plans, each offering unique perks at affordable prices.</p>
     <div className='flex flex-col md:flex-row gap-4 p-4'>
      {packages.map((pkg) => (
        <div 
          key={pkg.name}
          className='w-full md:w-1/3 border  bg-white shadow-lg rounded-lg p-4 text-center cursor-pointer transition-transform transform hover:scale-105'
        >
          <h2 className='text-xl font-bold mb-2'>{pkg.name}</h2>
          <p className='text-gray-700 mb-2'>{pkg.description}</p>
          <p className='text-2xl font-semibold mb-4'>{pkg.price}</p>
          <Link
            to={`/checkout/${pkg.name.toLowerCase()}`}
            className='inline-block px-6 py-2 bg-[#FF3811] text-white rounded-lg'
          >
            <span >Upgrade</span>
          </Link>
        </div>
      ))}
    </div>
   </div>
  );
};

export default MembershipCards;
