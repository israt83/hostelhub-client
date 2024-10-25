// import useAuth from '../../../hooks/useAuth'
// import { Helmet } from 'react-helmet-async'
// import useRole from '../../../hooks/useRole'
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

// const Profile = () => {
//   const { user, loading } = useAuth() || {}
//   const [role, isLoading] = useRole()

//   console.log(user)
//   if (isLoading || loading) return <LoadingSpinner />
//   return (
//     <div className='flex justify-center items-center h-screen'>
//       <Helmet>
//         <title>Profile</title>
//       </Helmet>
//       <div className='bg-white shadow-lg rounded-2xl w-3/5'>
//         <img
//           alt='profile'
//           src='https://wallpapercave.com/wp/wp10784415.jpg'
//           className='w-full mb-4 rounded-t-lg h-36'
//         />
//         <div className='flex flex-col items-center justify-center p-4 -mt-16'>
//           <a href='#' className='relative block'>
//             <img
//               alt='profile'
//               src={user?.photoURL}
//               className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
//             />
//           </a>

//           <p className='p-2 uppercase px-4 text-xs text-white bg-pink-500 rounded-full'>
//             {role}
//           </p>
//           <p className='mt-2 text-xl font-medium text-gray-800 '>
//             User Id: {user?.uid}
//           </p>
//           <div className='w-full p-2 mt-4 rounded-lg'>
//             <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
//               <p className='flex flex-col'>
//                 Name
//                 <span className='font-bold text-black '>
//                   {user?.displayName}
//                 </span>
//               </p>
//               <p className='flex flex-col'>
//                 Email
//                 <span className='font-bold text-black '>{user?.email}</span>
//               </p>

//               <div>
//                 <button className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
//                   Update Profile
//                 </button>
//                 <button className='bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>
//                   Change Password
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile


// import useAuth from '../../../hooks/useAuth';
// import { Helmet } from 'react-helmet-async';
// import useRole from '../../../hooks/useRole';
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

// const Profile = () => {
//   const { user, loading } = useAuth() || {};
//   const [role, isLoading] = useRole();

//   if (isLoading || loading) return <LoadingSpinner />;

//   // Define the mapping of roles to membership badges
//   const membershipBadges = {
//     silver: 'Silver Member',
//     gold: 'Gold Member',
//     platinum: 'Platinum Member',
//   };

//   return (
//     <div className='flex justify-center items-center h-screen'>
//       <Helmet>
//         <title>Profile</title>
//       </Helmet>
//       <div className='bg-white shadow-lg rounded-2xl w-3/5'>
//         <img
//           alt='profile banner'
//           src='https://plus.unsplash.com/premium_photo-1667912925305-629794bdb691?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//           className='w-full mb-4 rounded-t-lg h-36'
//         />
//         <div className='flex flex-col items-center justify-center p-4 -mt-16'>
//           <a href='#' className='relative block'>
//             <img
//               alt='profile'
//               src={user?.photoURL}
//               className='mx-auto object-cover rounded-full h-24 w-24 border-2 border-white'
//             />
//           </a>

//           {/* Display membership badge based on role */}
//           {membershipBadges[role] && (
//             <p className='p-2 uppercase px-4 text-xs text-white bg-green-500 rounded-full'>
//               {membershipBadges[role]}
//             </p>
//           )}

//           <p className='mt-2 text-xl font-medium text-gray-800'>
//             User ID: {user?.uid}
//           </p>

//           <div className='w-full p-2 mt-4 rounded-lg'>
//             <div className='flex flex-wrap items-center justify-between text-sm text-gray-600'>
//               <p className='flex flex-col'>
//                 Name
//                 <span className='font-bold text-black'>
//                   {user?.displayName}
//                 </span>
//               </p>
//               <p className='flex flex-col'>
//                 Email
//                 <span className='font-bold text-black'>{user?.email}</span>
//               </p>

//               <div>
//                 <button className='bg-[#FF3811] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#FF3811] block mb-1'>
//                   Update Profile
//                 </button>
//                 <button className='bg-[#FF3811] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#FF3811]'>
//                   Change Password
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import axios from 'axios';

const Profile = () => {
  const { user, loading } = useAuth() || {};
  const [role, isLoading] = useRole();
  const [subscribedPackages, setSubscribedPackages] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (user?.email) {
        try {
          const response = await axios.get(`http://localhost:8000/user-subscriptions?email=${user.email}`);
          setSubscribedPackages(response.data.subscribedPackages); // Set the subscribed packages in state
        } catch (error) {
          console.error('Error fetching subscriptions:', error);
        }
      }
    };

    fetchSubscriptions();
  }, [user]);

  if (isLoading || loading) return <LoadingSpinner />;

  return (
    <div className='flex justify-center items-center h-screen'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className='bg-white shadow-lg rounded-2xl w-3/5'>
        <img
          alt='profile banner'
          src='https://plus.unsplash.com/premium_photo-1667912925305-629794bdb691?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24 border-2 border-white'
            />
          </a>

          {/* Display membership badge images */}
          <div className='flex flex-wrap justify-center'>
            {subscribedPackages.map(pkg => (
              <div key={pkg.package_name} className='m-2 '>
              
                <img src={pkg?.badge_img} alt={`${pkg?.package_name} Badge`} className='h-14' />
                {/* <p>{pkg.package_name}</p> */}
              </div>
            ))}
          </div>

          <p className='mt-2 text-xl font-medium text-gray-800'>
            User ID: {user?.uid}
          </p>

          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600'>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black'>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black'>{user?.email}</span>
              </p>

              <div>
                <button className='bg-[#FF3811] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#FF3811] block mb-1'>
                  Update Profile
                </button>
                <button className='bg-[#FF3811] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#FF3811]'>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
