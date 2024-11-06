// import { useQuery } from "@tanstack/react-query";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// // import toast from "react-hot-toast";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";

// const AllReviews = () => {
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: meals = [],
//     isLoading,
//     // refetch,
//   } = useQuery({
//     queryKey: ["all-meals"],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/meals");
//       return data;
//     },
//   });



//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-8">
//        <Helmet>
//         <title>All Reviews | Dashboard</title>
//       </Helmet>
//       <div className="py-8">
//         <h2 className="text-2xl font-semibold leading-tight">All Reviews</h2>
//         <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//           <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//             <table className="min-w-full leading-normal">
//               <thead>
//                 <tr>
//                   <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
//                     Meal Title
//                   </th>
//                   <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
//                     Likes
//                   </th>
//                   <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
//                     Reviews Count
//                   </th>
//                   <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
//                     Delete
//                   </th>
//                   <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
//                     View Meal
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {meals.map((meal) => (
//                   <tr key={meal._id}>
//                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                       <p className="text-gray-900 whitespace-no-wrap">
//                         {meal.title}
//                       </p>
//                     </td>
//                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                       <p className="text-gray-900 whitespace-no-wrap">
//                         {meal.like ||0}
//                       </p>
//                     </td>
//                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                       {meal?.reviews?.length || 0}
//                       </td>
//                     </td>
//                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                       <button
//                         // onClick={() => handleDelete(meal._id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                       <Link to={`/meals/${meal?._id}`}><button
//                         className="text-blue-600 hover:text-blue-900"
                      
//                       >
//                         View Meal
//                       </button></Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllReviews;



import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: meals = [],
    isLoading,
  } = useQuery({
    queryKey: ["all-meals"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/meals");
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Filter meals to include only those with reviews
  const mealsWithReviews = meals.filter(meal => meal.reviews && meal.reviews.length > 0);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>All Reviews | Dashboard</title>
      </Helmet>
      <div className="py-8">
        <h2 className="text-2xl font-semibold leading-tight">All Reviews</h2>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Meal Title
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Likes
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Reviews Count
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Delete
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    View Meal
                  </th>
                </tr>
              </thead>
              <tbody>
                {mealsWithReviews.map((meal) => (
                  <tr key={meal._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {meal.title}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {meal.like || 0}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {meal?.reviews?.length || 0}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        // onClick={() => handleDelete(meal._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link to={`/meals/${meal._id}`}>
                        <button className="text-blue-600 hover:text-blue-900">
                          View Meal
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
