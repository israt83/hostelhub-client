


// import { Helmet } from 'react-helmet-async';
// import useAuth from '../../../hooks/useAuth';
// import { useQuery } from '@tanstack/react-query';
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
// import MyReviewRow from '../../../components/Dashboard/TableRows/MyReviewRow';
// import { axiosCommon } from '../../../hooks/useAxiosCommon';
// import { useParams } from 'react-router-dom';

// const MyReview = () => {
//   const { user } = useAuth(); // Get logged-in user
//   const { id } = useParams(); // Get meal ID from the URL

//   const { data: meals, isLoading, refetch } = useQuery({
//     queryKey: ['meals', id],
//     queryFn: async () => {
//       const { data } = await axiosCommon.get(`/meals`);
//       console.log('Meal data:', data); // Log to verify structure
//       return data;
//     },
//     enabled: !!user, // Ensure the query runs only when user is logged in
//   });

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <>
//       <Helmet>
//         <title>My Reviews</title>
//       </Helmet>

//       <div className='container mx-auto px-4 sm:px-8'>
//         <div className='py-8'>
//           <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
//             <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
//               <table className='min-w-full leading-normal'>
//                 <thead>
//                   <tr>
//                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                       Title
//                     </th>
//                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                       Likes
//                     </th>
//                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                       My Reviews
//                     </th>
//                     <th className='px-1 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                       View Meal
//                     </th>
//                     <th className='px-7 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                       Edit
//                     </th>
//                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                       Delete
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {meals?.map((meal) => (
//                     <MyReviewRow key={meal._id} meal={meal} refetch={refetch} />
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

// export default MyReview;



import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import MyReviewRow from '../../../components/Dashboard/TableRows/MyReviewRow';
import { axiosCommon } from '../../../hooks/useAxiosCommon';

const MyReview = () => {
  const { user } = useAuth(); // Get logged-in user

  
  const { data: meals, isLoading, refetch } = useQuery({
    queryKey: ['meals', user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/meals/reviews`, {
        withCredentials: true, // This ensures cookies (containing the JWT) are sent with the request
      });
      console.log('Meal data:', data); // Log to verify structure
      return data;
    },
    enabled: !!user, // Ensure the query runs only when user is logged in
  });
  
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>My Reviews</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Title
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Likes
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      My Reviews
                    </th>
                    <th className='px-1 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      View Meal
                    </th>
                    <th className='px-7 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Edit
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {meals?.map((meal) => (
                    <MyReviewRow key={meal._id} meal={meal} user={user} refetch={refetch} />
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

export default MyReview;
