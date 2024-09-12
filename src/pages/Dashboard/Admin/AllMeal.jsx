// import { Helmet } from 'react-helmet-async'

// import { useMutation, useQuery } from '@tanstack/react-query'

// import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
// import toast from 'react-hot-toast'
// import useAuth from '../../../hooks/useAuth'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'
// import MealDataRow from '../../../components/Dashboard/TableRows/MealDataRows'
// const AllMeal= () => {
//   const { user } = useAuth()
//   const axiosSecure = useAxiosSecure()
//   //   Fetch Meals Data
//   const {
//     data: meals = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ['all-meal', user?.email],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(`/all-meal/${user?.email}`)

//       return data
//     },
//   })

//   //   delete
//   const { mutateAsync } = useMutation({
//     mutationFn: async id => {
//       const { data } = await axiosSecure.delete(`/meals/${id}`)
//       return data
//     },
//     onSuccess: data => {
//       console.log(data)
//       refetch()
//       toast.success('Successfully deleted.')
//     },
//   })

//   //  Handle Delete
//   const handleDelete = async id => {
//     console.log(id)
//     try {
//       await mutateAsync(id)
//     } catch (err) {
//       console.log(err)
//     }
//   }
//   if (isLoading) return <LoadingSpinner />
//   return (
//     <>
//       <Helmet>
//         <title>My Listings</title>
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
//                       Location
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
//                       Delete
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Update
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Room row data */}

//                   {meals.map(room => (
//                     <MealDataRow
//                       key={room._id}
//                       room={room}
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

import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

// import { useState } from 'react'
import MealDataRow from '../../../components/Dashboard/TableRows/MealDataRows'

const AllMeal = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  // const [sortBy, setSortBy] = useState(null)

  // Fetch Meals Data
  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['all-meals', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-meals`)
      return data
    },
  })

  // Delete meal
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/meals/${id}`)
      return data
    },
    onSuccess: () => {
      refetch()
      toast.success('Successfully deleted.')
    },
  })

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await mutateAsync(id)
    } catch (err) {
      console.log(err)
    }
  }

  // Sort meals
  // const sortedMeals = [...meals].sort((a, b) => {
  //   if (sortBy === 'likes') {
  //     return b.likes - a.likes
  //   }
  //   if (sortBy === 'reviews') {
  //     return b.reviews.length - a.reviews.length
  //   }
  //   return 0
  // })

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <Helmet>
        <title>All Meals</title>
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
                    <th
                      className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal cursor-pointer'
                     
                    >
                      Likes
                    </th>
                    <th
                      className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal cursor-pointer'
                  
                    >
                      Reviews
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Distributor
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Delete
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Update
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Meal row data
                  {sortedMeals.map((meal) => (
                    <MealDataRow
                      key={meal._id}
                      meal={meal}
                      handleDelete={handleDelete}
                      refetch={refetch}
                    />
                  ))} */}
                  
                  {meals.map(meal => (
                    <MealDataRow
                      key={meal._id}
                      meal={meal}
                      handleDelete={handleDelete}
                      refetch={refetch}
                    />
                  ))}
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllMeal
