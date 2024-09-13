import {  useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const UpcomingMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Assume the user object contains subscription info

  const [likedMeals, setLikedMeals] = useState([]);

  // Fetch upcoming meals
  const { data: meals = [], refetch } = useQuery({
    queryKey: ['upcomingMeals'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/upcoming-meals');
      return data;
    },
  });

  // Mutation to handle liking a meal
  const likeMutation = useMutation({
    mutationFn: async (mealId) => {
      const { data } = await axiosSecure.post(`/meals/${mealId}/like`, {
        userId: user._id,
      });
      return data;
    },
    onSuccess: () => {
      toast.success('Meal liked successfully!');
      refetch(); // Refresh meals data
    },
  });

  const handleLike = async (mealId) => {
    if (!user?.subscription) {
      return toast.error('You need a premium membership to like meals.');
    }

    if (likedMeals.includes(mealId)) {
      return toast.error('You have already liked this meal.');
    }

    try {
      await likeMutation.mutateAsync(mealId);
      setLikedMeals([...likedMeals, mealId]);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="upcoming-meals container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Upcoming Meals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <div key={meal._id} className="meal-card border p-4 rounded-lg shadow">
            <img src={meal.image} alt={meal.title} className="mb-4" />
            <h3 className="text-xl font-semibold">{meal.title}</h3>
            <p>{meal.description}</p>
            <button
              className={`mt-4 px-4 py-2 rounded bg-${likedMeals.includes(meal._id) ? 'gray' : 'blue'}-500 text-white`}
              onClick={() => handleLike(meal._id)}
              disabled={likedMeals.includes(meal._id)}
            >
              {likedMeals.includes(meal._id) ? 'Liked' : 'Like'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeals;