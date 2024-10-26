


import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cover from "./Cover";
import { AiOutlineLike } from "react-icons/ai";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const UpcomingMeals = () => {
  const { user } = useAuth(); 
  const axiosCommon = useAxiosCommon();
  const queryClient = useQueryClient();

  const [subscribedPackages, setSubscribedPackages] = useState([]);
  const [likedMeals, setLikedMeals] = useState({}); // Store liked status per meal

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (user?.email) {
        try {
          const response = await axios.get(`https://hostel-management-system-server-six.vercel.app/user-subscriptions?email=${user.email}`);
          setSubscribedPackages(response.data.subscribedPackages || []);
        } catch (error) {
          console.error('Error fetching subscriptions:', error);
        }
      }
    };
    fetchSubscriptions();
  }, [user]);

  const { data: meals = [] } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/upcoming-meals");
      return data;
    },
    enabled: !!user,
  });

  const handleLike = async (mealId) => {
    if (!user || !user.email) {
      toast.error("Please log in to like this meal.");
      return;
    }
    if (!subscribedPackages.length) {
      toast.error("Only subscribed users can like meals.");
      return;
    }
    if (likedMeals[mealId]) {
      toast.error("You have already liked this meal.");
      return;
    }

    try {
      await axiosCommon.post(`/upcoming-meals/${mealId}`, { email: user.email });
      setLikedMeals((prevLikedMeals) => ({ ...prevLikedMeals, [mealId]: true }));
      queryClient.invalidateQueries(["upcomingMeals"]);
    } catch (error) {
      console.error("Error liking meal:", error);
    }
  };

  return (
    
    <div className="upcoming-meals container mx-auto px-4 sm:px-8 py-8">
       <Helmet>
        <title>UpcomingMeal| Home</title>
      </Helmet>
      <Cover />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-5">
        {meals.map((meal) => (
          <div key={meal._id} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
            <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                 style={{ backgroundImage: `url(${meal.image})` }}></div>
            <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 dark:text-white">
                {meal.title}
              </h3>
              <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                <button
                  onClick={() => handleLike(meal._id)}
                  className={`mt-4 px-4 py-2 rounded text-white ${likedMeals[meal._id] ? "bg-blue-600" : "bg-gray-400"}`}
                >
                  <div className="flex gap-1">
                    <AiOutlineLike className="mt-1" /> ({meal.like || 0})
                  </div>
                </button>
                <p className="px-2 py-1 text-xs font-semibold text-white bg-gray-800 rounded">
                  {meal.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeals;
