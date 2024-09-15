
// import { Helmet } from 'react-helmet-async'
// import { useMutation, useQuery } from '@tanstack/react-query'
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
// import toast from 'react-hot-toast'
// import useAuth from '../../../hooks/useAuth'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'

// // import { useState } from 'react'
// import MealDataRow from '../../../components/Dashboard/TableRows/MealDataRows'

// const AllMeal = () => {
//   const { user } = useAuth()
//   const axiosSecure = useAxiosSecure()
//   // const [sortBy, setSortBy] = useState(null)

//   // Fetch Meals Data
//   const {
//     data: meals = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ['all-meals', user?.email],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(`/all-meals`)
//       return data
//     },
//   })

//   // Delete meal
//   const { mutateAsync } = useMutation({
//     mutationFn: async (id) => {
//       const { data } = await axiosSecure.delete(`/meals/${id}`)
//       return data
//     },
//     onSuccess: () => {
//       refetch()
//       toast.success('Successfully deleted.')
//     },
//   })

//   // Handle Delete
//   const handleDelete = async (id) => {
//     try {
//       await mutateAsync(id)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   // Sort meals
//   // const sortedMeals = [...meals].sort((a, b) => {
//   //   if (sortBy === 'likes') {
//   //     return b.likes - a.likes
//   //   }
//   //   if (sortBy === 'reviews') {
//   //     return b.reviews.length - a.reviews.length
//   //   }
//   //   return 0
//   // })

//   if (isLoading) return <LoadingSpinner />

//   return (
//     <>
//       <Helmet>
//         <title>All Meals</title>
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
//                     <th
//                       className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal cursor-pointer'
                     
//                     >
//                       Likes
//                     </th>
//                     <th
//                       className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal cursor-pointer'
                  
//                     >
//                       Reviews
//                     </th>
//                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                       Distributor
//                     </th>
//                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                       Delete
//                     </th>
//                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                       Update
//                     </th>
//                     <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                       View
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Meal row data
//                   {sortedMeals.map((meal) => (
//                     <MealDataRow
//                       key={meal._id}
//                       meal={meal}
//                       handleDelete={handleDelete}
//                       refetch={refetch}
//                     />
//                   ))} */}
                  
//                   {meals.map(meal => (
//                     <MealDataRow
//                       key={meal._id}
//                       meal={meal}
//                       handleDelete={handleDelete}
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

// export default AllMeal
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import MealDataRow from '../../../components/Dashboard/TableRows/MealDataRows';

const AllMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // State for pagination and sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [mealsPerPage] = useState(5); // Number of meals per page
  const [sortBy, setSortBy] = useState('likes'); // Default sorting by likes

  // Fetch Meals Data with sorting
  const {
    data: mealData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['all-meals', user?.email, currentPage, sortBy],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/all-meals?page=${currentPage}&limit=${mealsPerPage}&sortBy=${sortBy}`
      );
      return data;
    },
  });

  const meals = mealData.meals || [];
  const totalMeals = mealData.totalMeals || 0;
  const totalPages = Math.ceil(totalMeals / mealsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    refetch();
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    refetch();
  };
  //   delete
  const { mutateAsync } = useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.delete(`/meals/${id}`)
      return data
    },
    onSuccess: data => {
      console.log(data)
      refetch()
      toast.success('Successfully deleted.')
    },
  })

  //  Handle Delete
  const handleDelete = async id => {
    console.log(id)
    try {
      await mutateAsync(id)
    } catch (err) {
      console.log(err)
    }
  }
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>All Meals</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-center mb-4">
            <label htmlFor="sort" className="mr-2 mt-1 font-medium text-orange-600">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="px-4 py-2 bg-white border border-orange-600 rounded-md text-orange-600"
            >
              <option value="likes">Likes</option>
              <option value="reviews">Reviews</option>
            </select>
          </div>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Title
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Likes
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Reviews
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Distributor
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Delete
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Update
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {meals.map((meal) => (
                    <MealDataRow key={meal._id} meal={meal} refetch={refetch} handleDelete={handleDelete}/>
                  ))}
                </tbody>
              </table>

              {/* Pagination Section */}
              <div className="flex justify-center mt-12">
                {/* Previous Button */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#FF3811] hover:text-white"
                >
                  <div className="flex items-center -mx-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                      />
                    </svg>
                    <span className="mx-1">Previous</span>
                  </div>
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    onClick={() => handlePageChange(i + 1)}
                    key={i + 1}
                    className={`${
                      currentPage === i + 1 ? 'bg-[#FF3811] text-white' : 'text-gray-700'
                    } px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-[#FF3811] hover:text-white`}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-[#FF3811] disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
                >
                  <div className="flex items-center -mx-1">
                    <span className="mx-1">Next</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllMeal;




// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
// import toast from 'react-hot-toast';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import MealDataRow from '../../../components/Dashboard/TableRows/MealDataRows';

// const AllMeal = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const mealsPerPage = 10; // Set the number of meals per page

//   // Fetch Meals Data
//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ['all-meals', user?.email, currentPage],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(`/all-meals?page=${currentPage}&limit=${mealsPerPage}`);
//       return data;
//     },
//     enabled: !!user?.email, // Make sure the query runs only when user email is available
//   });

//   // Handle Pagination
//   const totalMeals = data?.totalMeals || 0;
//   const totalPages = Math.ceil(totalMeals / mealsPerPage);

//   const handlePageChange = (newPage) => {
//     if (newPage < 1 || newPage > totalPages) return;
//     setCurrentPage(newPage);
//     refetch(); // Refetch meals data when the page changes
//   };

//   // Check for loading state
//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <>
//       <Helmet>
//         <title>All Meals</title>
//       </Helmet>

//       <div className="container mx-auto px-4 sm:px-8">
//         <div className="py-8">
//           <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//             <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//               <table className="min-w-full leading-normal">
//                 <thead>
//                   <tr>
//                     <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
//                       Title
//                     </th>
//                     <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
//                       Likes
//                     </th>
//                     <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
//                       Reviews
//                     </th>
//                     <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
//                       Distributor
//                     </th>
//                     <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
//                       Delete
//                     </th>
//                     <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
//                       Update
//                     </th>
//                     <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
//                       View
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Render meal data */}
//                   {data?.meals?.map((meal) => (
//                     <MealDataRow key={meal._id} meal={meal} refetch={refetch} />
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination Section */}
//             <div className="flex justify-center mt-12">
//               {/* Previous Button */}
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#FF3811] hover:text-white"
//               >
//                 <div className="flex items-center -mx-1">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-6 h-6 mx-1 rtl:-scale-x-100"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
//                   </svg>
//                   <span className="mx-1">Previous</span>
//                 </div>
//               </button>

//               {/* Page Numbers */}
//               {[...Array(totalPages)].map((_, index) => (
//                 <button
//                   key={index + 1}
//                   onClick={() => handlePageChange(index + 1)}
//                   className={`px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md ${
//                     currentPage === index + 1 ? 'bg-[#FF3811] text-white' : 'bg-gray-200 text-gray-700'
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}

//               {/* Next Button */}
//               <button
//                 disabled={currentPage === totalPages}
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-[#FF3811] disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
//               >
//                 <div className="flex items-center -mx-1">
//                   <span className="mx-1">Next</span>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-6 h-6 mx-1 rtl:-scale-x-100"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AllMeal;
