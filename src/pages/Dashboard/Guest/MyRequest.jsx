// import { Helmet } from 'react-helmet-async'
// import useAuth from '../../../hooks/useAuth'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'
// import { useQuery } from '@tanstack/react-query'

// import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
// import ReaquestMealRow from '../../../components/Dashboard/TableRows/ReaquestMealRow'

// const MyRequest = () => {
//   const { user } = useAuth()
//   const axiosSecure = useAxiosSecure()
//   //   Fetch Bookings Data
//   const {
//     data: requests = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ['my-request', user?.email],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(`/my-request/${user?.email}`)

//       return data
//     },
//   })

//   console.log(requests)
//   if (isLoading) return <LoadingSpinner />
//   return (
//     <>
//       <Helmet>
//         <title>My Request</title>
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
//                       Info
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

//                   {requests.map(request => (
//                     <ReaquestMealRow
//                       key={request._id}
//                       request={request}
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

// export default MyRequest




import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import ReaquestMealRow from '../../../components/Dashboard/TableRows/ReaquestMealRow';

const MyRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  
  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['my-request', user?.email],
    queryFn: async () => {
      console.log("Fetching requests for email:", user?.email); // Debugging line
      const { data } = await axiosSecure.get(`/my-request/${user?.email}`);
      console.log('Fetched requests:', data); // Debugging line
      return data;
    },
    enabled: !!user?.email,
  });
  

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>My Requests</title>
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
                  {/* Display each request as a table row */}
                  {requests.map((request) => (
                    <ReaquestMealRow key={request._id} request={request} refetch={refetch} />
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

export default MyRequest;
