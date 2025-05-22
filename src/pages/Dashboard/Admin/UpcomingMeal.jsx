

import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import useQueryClient
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdOutlinePublish } from "react-icons/md";
import AddUpcomingMealModal from "../../../components/Modal/AddUpcomingMealModal";
import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const UpcomingMeal = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const queryClient = useQueryClient();

  // Fetch all upcoming meals
  const { data: upcomingMeals = [], isLoading } = useQuery({
    queryKey: ["all-upcoming-meals"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/upcoming-meals");
      return data;
    },
  });

  // Function to add a meal
  const addMeal = async (mealData) => {
    try {
      await axiosSecure.post("/upcoming-meals", mealData);
      toast("Meal added successfully!");

     
      queryClient.invalidateQueries("all-upcoming-meals");

      setIsModalOpen(false); 
    } catch (error) {
      console.error("Error adding meal: ", error);
    }
  };

  // Function to publish a meal
  const publishMeal = async (mealId) => {
    try {
      await axiosSecure.post(`/publish-meal/${mealId}`);
      toast.success("Meal published successfully!");

      // Invalidate the query to refetch the updated list of upcoming meals
      queryClient.invalidateQueries("all-upcoming-meals");
    } catch (error) {
      console.error("Error publishing meal: ", error);
      toast.error("Failed to publish meal.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Upcoming Meal | Dashboard</title>
      </Helmet>
      <div className="py-8">
        <div className="grid grid-cols-2">
          <h2 className="text-2xl font-semibold leading-tight">
            Upcoming Meals
          </h2>
          <div className="text-right">
            <button
              className="px-5 py-3 font-semibold border rounded dark:border-gray-800 dark:text-gray-800"
              onClick={() => setIsModalOpen(true)}
            >
              Add Upcoming Meal
            </button>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                    Meal Image
                  </th>
                  <th className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                    Meal Title
                  </th>
                  <th className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                    Price
                  </th>
                  <th className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                    Rating
                  </th>
                  <th className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                    Category
                  </th>
                  <th className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                    Publish Meal
                  </th>
                </tr>
              </thead>
              <tbody>
                {upcomingMeals.map((upcomingMeal) => (
                  <tr key={upcomingMeal._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <img
                        className="w-24 h-24"
                        src={upcomingMeal.image}
                        alt={upcomingMeal.title}
                      />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {upcomingMeal.title}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        ${upcomingMeal.price}
                      </p>
                    </td>
                    <td className="px-10 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {upcomingMeal.like}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {upcomingMeal.category}
                      </p>
                    </td>
                    <td className="px-8 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => publishMeal(upcomingMeal._id)} // Publish meal on button click
                        className="text-orange-600 hover:text-orange-800"
                      >
                        <MdOutlinePublish className="w-8 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal to add upcoming meal */}
      <AddUpcomingMealModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        mealInfo={selectedMeal}
        addMeal={addMeal} 
        adminName={"Admin Name Here"} 
      />
    </div>
  );
};

export default UpcomingMeal;
