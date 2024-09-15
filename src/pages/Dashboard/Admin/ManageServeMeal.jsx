// import { Helmet } from 'react-helmet-async'
// import useAuth from '../../../hooks/useAuth'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'
// import { useQuery } from '@tanstack/react-query'

// import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
// import MealDataRow from '../../../components/Dashboard/TableRows/MealDataRows'

// const ManageServeMeal = () => {
//   const { user } = useAuth()
//   const axiosSecure = useAxiosSecure()
//   //   Fetch Bookings Data
//   const {
//     data: bookings = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ['my-bookings', user?.email],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(`/manage-serve-meal/${user?.email}`)

//       return data
//     },
//   })

//   console.log(bookings)
//   if (isLoading) return <LoadingSpinner />
//   return (
//     <>
//       <Helmet>
//         <title>Manage Serve Meal</title>
//       </Helmet>

//       <div className='container mx-auto px-4 sm:px-8'>
//         <div className='py-8'>
//           <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
//             <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
//               <table className='min-w-full leading-normal'>
//                 <thead>
//                   <tr>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Title
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Guest Info
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Price
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       From
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       To
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
                  
//                   {/* Table Row Data */}
//                   {bookings.map(booking => (
//                     <MealDataRow
//                       key={booking._id}
//                       booking={booking}
//                       refetch={refetch}
//                     />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ManageServeMeal



// import { Helmet } from 'react-helmet-async';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

// import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

// import ReaquestMealRow from '../../../components/Dashboard/TableRows/ReaquestMealRow';

// const ManageServeMeal = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   // Fetch Bookings Data
//   const {data: requests = [], isLoading, refetch } = useQuery(
//     ['my-request', user?.email],
//     async () => {
//       const { data } = await axiosSecure.get(`/manage-serve-meal/`);
//       return data;
//     },
//     {
//       enabled: !!user?.email, // Ensure the query runs only when the email is available
//     }
//   );

//   console.log(requests);

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <>
//       <Helmet>
//         <title>Manage Serve Meal</title>
//       </Helmet>

//       <div className='container mx-auto px-4 sm:px-8'>
//         <div className='py-8'>
//           <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
//             <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
//               <table className='min-w-full leading-normal'>
//                 <thead>
//                   <tr>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Title
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Guest Info
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Price
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       From
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       To
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                 {requests.map((request) => (
//                     <ReaquestMealRow key={request._id} request={request} refetch={refetch} />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ManageServeMeal;


import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

import ServeMealRow from '../../../components/Dashboard/TableRows/ServeMealRow';

const ManageServeMeal = () => {
  const { user } = useAuth(); // Get the authenticated user
  const axiosSecure = useAxiosSecure(); // Secure Axios instance

  // Fetch meal requests data for the logged-in admin
//   const { data: requests = [], isLoading, refetch } = useQuery(
//     ['my-request', user?.email],
//     async () => {
//       if (!user?.email) return []; // If no email, return an empty array
//       const { data } = await axiosSecure.get(`/manage-serve-meal/${user?.email}`); // Pass user email to API
//       return data;
//     },
//     {
//       enabled: !!user?.email, // Ensure query runs only when the user email is available
//     }
//   );
const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['my-request', user?.email],
    queryFn: async () => {
      console.log("Fetching requests for email:", user?.email); // Debugging line
      const { data } = await axiosSecure.get(`/manage-serve-meal/${user?.email}`);
      console.log('Fetched requests:', data); // Debugging line
      return data;
    },
    enabled: !!user?.email,
  });
  
  console.log(requests); // Log the data for debugging

  if (isLoading) return <LoadingSpinner />; // Show loading spinner while data is being fetched

  return (
    <>
      <Helmet>
        <title>Manage Serve Meal</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
              <thead>
                  <tr>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                     image
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    Title
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      reviews
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    
                    Likes
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    status
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <ServeMealRow
                      key={request._id}
                      request={request}
                      refetch={refetch} // Pass the refetch function to refresh the data if needed
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageServeMeal;