


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

  const [currentPage, setCurrentPage] = useState(1);
  const [mealsPerPage] = useState(5); 
  const [sortBy, setSortBy] = useState('likes'); 

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

  // Mutation for deleting meals
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/meals/${id}`);
      return data;
    },
    onSuccess: (data) => {
      refetch();
      toast.success('Successfully deleted.');
    },
  });

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await mutateAsync(id);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>All Meals</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
        <h2 className="text-2xl font-semibold leading-tight">All Meals</h2>
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
                    <MealDataRow 
                      key={meal._id} 
                      meal={meal} 
                      refetch={refetch} 
                      handleDelete={handleDelete} 
                    />
                  ))}
                </tbody>
              </table>

            
             
            </div>
              {/* Pagination Section */}
            <div className="flex justify-center mt-5">
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
    </>
  );
};

export default AllMeal;
