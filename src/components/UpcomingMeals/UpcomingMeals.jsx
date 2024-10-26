// import { useEffect, useState } from "react";
// import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

// import toast from "react-hot-toast";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import Cover from "./Cover";
// import { AiOutlineLike } from "react-icons/ai";
// import useAxiosCommon from "../../hooks/useAxiosCommon";
// import axios from "axios";

// const UpcomingMeals = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth(); // Assume the user object contains subscription info
//   const [likeCount, setLikeCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);

//   const [subscribedPackages, setSubscribedPackages] = useState([]);

//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       if (user?.email) {
//         try {
//           const response = await axios.get(`http://localhost:8000/user-subscriptions?email=${user.email}`);
//           setSubscribedPackages(response.data.subscribedPackages || []); // Set the subscribed packages in state
//         } catch (error) {
//           console.error('Error fetching subscriptions:', error);
//         }
//       }
//     };

//     fetchSubscriptions();
//   }, [user]);

//   // Fetch upcoming meals
//   const { data: meals = [], refetch } = useQuery({
//     queryKey: ["upcomingMeals"],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/upcoming-meals");
//       return data;
//     },
//   });

//   // Mutation to handle liking a meal
//   const likeMutation = useMutation({
//     mutationFn: async (mealId) => {
//       const { data } = await axiosSecure.post(
//         `/upcoming-meals/${mealId}/like`,
//         {
//           userId: user._id,
//         }
//       );
//       return data;
//     },
//     onSuccess: () => {
//       toast.success("Meal liked successfully!");
//       refetch(); // Refresh meals data
//     },
//   });

//   const handleLikeCount = async () => {
//     if (!user || !user.email) {
//       alert("You need to log in to like this meal.");
//       return;
//     }
//     if (isLiked) {
//       alert("You have already liked this meal.");
//       return;
//     }

//     try {
//       await useAxiosCommon.patch(`/upcoming-meals/$`, { email: user.email });
//       setLikeCount((prevCount) => prevCount + 1);
//       setIsLiked(true);
//       QueryClient.invalidateQueries(["upcoming-meals"]);
//     } catch (error) {
//       console.error("Error updating likes:", error);
//     }
//   };

//   return (
//     <div className="upcoming-meals container mx-auto px-4 sm:px-8 py-8">
//       <Cover></Cover>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-5">
//   {meals.map((meal) => (
//     <div key={meal._id} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
//       {/* Meal Image */}
//       <div
//         className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
//         style={{
//           backgroundImage: `url(${meal.image})`
//         }}
//       ></div>

//       {/* Meal Info */}
//       <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
//         {/* Meal Title */}
//         <h3 className="py-2 font-bold tracking-wide text-center text-gray-800  dark:text-white">
//           {meal.title}
//         </h3>

//         {/* Price and Add to Cart Button */}
//         <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">

//           <button
//                   className={`px-1 py-1 rounded text-white ${
//                     isLiked ? "bg-blue-600" : "bg-gray-400"
//                   }`}
//                   onClick={handleLikeCount}
//                   disabled={isLiked}
//                 >
//                   <div className="flex gap-1">
//                     <AiOutlineLike className="mt-1" /> ({likeCount})
//                   </div>
//                 </button>

//           <p className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
//            {meal.category}
//           </p>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//     </div>
//   );
// };

// export default UpcomingMeals;

// import { useEffect, useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";

// import useAuth from "../../hooks/useAuth";
// import Cover from "./Cover";
// import { AiOutlineLike } from "react-icons/ai";
// import axios from "axios";

// import { useParams } from "react-router-dom";
// import useAxiosCommon from "../../hooks/useAxiosCommon";

// const UpcomingMeals = () => {
//   const { user } = useAuth(); // Assume the user object contains subscription info
//   // const [subscribedPackages, setSubscribedPackages] = useState([]);
//   const { id } = useParams();
//   const [likeCount, setLikeCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const queryClient = useQueryClient();
//   const axiosCommon = useAxiosCommon();

//   // useEffect(() => {
//   //   const fetchSubscriptions = async () => {
//   //     if (user?.email) {
//   //       try {
//   //         const response = await axios.get(
//   //           `http://localhost:8000/user-subscriptions?email=${user.email}`
//   //         );
//   //         setSubscribedPackages(response.data.subscribedPackages || []);
//   //       } catch (error) {
//   //         console.error("Error fetching subscriptions:", error);
//   //       }
//   //     }
//   //   };
//   //   fetchSubscriptions();
//   // }, [user]);

//   const { data: meals = [] } = useQuery({
//     queryKey: ["upcomingMeals", id],
//     queryFn: async () => {
//       const { data } = await axiosCommon.get("/upcoming-meals");
//       return data;
//     },
//   });

//   // const { data:  = [] } = useQuery({
//   //   queryKey: ["upcomingMeals", id],
//   //   queryFn: async () => {
//   //     if (!id) throw new Error("Meal ID is missing");
//   //     const { data } = await axiosCommon.get(`/upcoming-meals/${id}`);
//   //     setLikeCount(data.like || 0);
//   //     setIsLiked(data.likedUsers?.includes(user?.email));
//   //     return data;
//   //   },
//   //   enabled: !!id && !!user, // Ensure both id and user are available
//   // });

//   const handleLikeCount = async (mealId) => {
//     if (!user || !user.email) {
//       alert("You need to log in to like this meal.");
//       return;
//     }

//     const meal = meals.find((meal) => meal._id === mealId);

//     if (meal.likedUsers?.includes(user.email)) {
//       alert("You have already liked this meal.");
//       return;
//     }

//     try {
//       await axiosCommon.patch(`/upcoming-meals/${mealId}`, {
//         email: user.email,
//       });
//       queryClient.invalidateQueries(["upcomingMeals", id]); // Re-fetch the data to get the updated like count
//     } catch (error) {
//       console.error("Error updating likes:", error);
//     }
//   };

//   if (!user) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="upcoming-meals container mx-auto px-4 sm:px-8 py-8">
//       <Cover />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-5">
//         {meals.map((meal) => (
//           <div
//             key={meal._id}
//             className="flex flex-col items-center justify-center w-full max-w-sm mx-auto"
//           >
//             <div
//               className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
//               style={{
//                 backgroundImage: `url(${meal.image})`,
//               }}
//             ></div>
//             <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
//               <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 dark:text-white">
//                 {meal.title}
//               </h3>
//               <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
//                 {/* <button
//                                     className={`px-1 py-1 rounded text-white ${
//                                         meal.likedUsers && meal.likedUsers.includes(user.email)
//                                             ? "bg-blue-600"
//                                             : "bg-gray-400"
//                                     }`}
//                                     onClick={() => handleLikeCount(meal)}
//                                     disabled={meal.likedUsers && meal.likedUsers.includes(user.email)}
//                                 >
//                                     <div className="flex gap-1">
//                                         <AiOutlineLike className="mt-1" /> ({meal.likes || 0})
//                                     </div>
//                                 </button> */}

//                 <button
//                   className={`mt-4 px-4 py-2 rounded text-white ${
//                     meal.likedUsers?.includes(user.email)
//                       ? "bg-blue-600"
//                       : "bg-gray-400"
//                   }`}
//                   onClick={() => handleLikeCount(meal._id)}
//                   disabled={meal.likedUsers?.includes(user.email)}
//                 >
//                   <div className="flex gap-1">
//                     <AiOutlineLike className="mt-1" /> ({meal.like || 0})
//                   </div>
//                 </button>

//                 <p className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
//                   {meal.category}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UpcomingMeals;

// import { useQuery } from "@tanstack/react-query";
// import Cover from "./Cover";
// import { AiOutlineLike } from "react-icons/ai";
// import useAxiosCommon from "../../hooks/useAxiosCommon";
// import useAuth from "../../hooks/useAuth";
// import { useEffect, useState } from "react";
// import axios from "axios";
// // import { useParams } from "react-router-dom";

// const UpcomingMeals = () => {
//   const { user } = useAuth(); // Assume the user object contains subscription info
//   // const [likeCount, setLikeCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const axiosCommon = useAxiosCommon();
//   // const { id } = useParams();
//   // const queryClient = useQueryClient();

//   const [subscribedPackages, setSubscribedPackages] = useState([]);


//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       if (user?.email) {
//         try {
//           const response = await axios.get(`http://localhost:8000/user-subscriptions?email=${user.email}`);
//           setSubscribedPackages(response.data.subscribedPackages || []); // Set the subscribed packages in state
//         } catch (error) {
//           console.error('Error fetching subscriptions:', error);
//         }
//       }
//     };

//     fetchSubscriptions();
//   }, [user]);


//   const { data: meals = [] } = useQuery({
//     queryKey: ["upcomingMeals"],
//     queryFn: async () => {
//       const { data } = await axiosCommon.get("/upcoming-meals");
//       // setLikeCount(data.like || 0);
//       setIsLiked(data.likedUsers?.includes(user?.email));
//       return data;
//     },
//     enabled: !!user,
//   });

//   // const handleLikeCount = async () => {
//   //   if (!user || !user.email) {
//   //     alert("You need to log in to like this meal.");
//   //     return;
//   //   }
//   //   if (isLiked) {
//   //     alert("You have already liked this meal.");
//   //     return;
//   //   }

//   //   try {
//   //     await axiosCommon.patch(`/upcoming-meals/${id}`, { email: user.email });
//   //     setLikeCount((prevCount) => prevCount + 1);
//   //     setIsLiked(true);
//   //     queryClient.invalidateQueries(["upcomingMeals", id]);
//   //   } catch (error) {
//   //     console.error("Error updating likes:", error);
//   //   }
//   // };

//   // Handle loading state

//   return (
//     <div className="upcoming-meals container mx-auto px-4 sm:px-8 py-8">
//       <Cover />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-5">
//         {meals.map((meal) => (
//           <div
//             key={meal._id}
//             className="flex flex-col items-center justify-center w-full max-w-sm mx-auto"
//           >
//             <div
//               className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
//               style={{
//                 backgroundImage: `url(${meal.image})`,
//               }}
//             ></div>
//             <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
//               <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 dark:text-white">
//                 {meal.title}
//               </h3>
//               <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
//                 {/* <button
//                   className={`mt-4 px-4 py-2 rounded text-white ${
//                     meal.likedUsers?.includes()
//                       ? "bg-blue-600"
//                       : "bg-gray-400"
//                   }`}
             
//                 >
//                   <div className="flex gap-1">
//                     <AiOutlineLike className="mt-1" /> ({meal.like || 0})
//                   </div>
//                 </button> */}

//                 <button
//                   className={`mt-4 px-4 py-2 rounded text-white ${
//                     isLiked ? "bg-blue-600" : "bg-gray-400"
//                   }`}
                 
                
//                 >
//                   <div className="flex gap-1">
//                     <AiOutlineLike className="mt-1" /> ({meal.like||0})
//                   </div>
//                 </button>

//                 <p className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
//                   {meal.category}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UpcomingMeals;





// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import Cover from "./Cover";
// import { AiOutlineLike } from "react-icons/ai";
// import useAxiosCommon from "../../hooks/useAxiosCommon";
// import useAuth from "../../hooks/useAuth";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const UpcomingMeals = () => {
//   const { user } = useAuth(); 
//   const axiosCommon = useAxiosCommon();
//   const queryClient = useQueryClient();
//   const [isLiked, setIsLiked] = useState(false);
//   const [subscribedPackages, setSubscribedPackages] = useState([]);

//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       if (user?.email) {
//         try {
//           const response = await axios.get(`http://localhost:8000/user-subscriptions?email=${user.email}`);
//           setSubscribedPackages(response.data.subscribedPackages || []);
//         } catch (error) {
//           console.error('Error fetching subscriptions:', error);
//         }
//       }
//     };
//     fetchSubscriptions();
//   }, [user]);

//   const { data: meals = [] } = useQuery({
//     queryKey: ["upcomingMeals"],
//     queryFn: async () => {
//       const { data } = await axiosCommon.get("/upcoming-meals");
//       return data;
//     },
//     enabled: !!user,
//   });

//   const handleLike = async (mealId) => {
//     if (!user || !user.email) {
//       alert("Please log in to like this meal.");
//       return;
//     }
//     if (!subscribedPackages.length) {
//       alert("Only subscribed users can like meals.");
//       return;
//     }
//     if (isLiked) {
//       alert("You have already liked this meal.");
//       return;
//     }

//     try {
//       await axiosCommon.post(`/upcoming-meals/${mealId}`, { email: user.email });
//       setIsLiked(true);
//       queryClient.invalidateQueries(["upcomingMeals"]);
//     } catch (error) {
//       console.error("Error liking meal:", error);
//     }
//   };

//   return (
//     <div className="upcoming-meals container mx-auto px-4 sm:px-8 py-8">
//       <Cover />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-5">
//         {meals.map((meal) => (
//           <div key={meal._id} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
//             <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
//                  style={{ backgroundImage: `url(${meal.image})` }}></div>
//             <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
//               <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 dark:text-white">
//                 {meal.title}
//               </h3>
//               <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
//                 <button
//                   onClick={() => handleLike(meal._id)}
//                   className={`mt-4 px-4 py-2 rounded text-white ${isLiked ? "bg-blue-600" : "bg-gray-400"}`}
//                 >
//                   <div className="flex gap-1">
//                     <AiOutlineLike className="mt-1" /> ({meal.like || 0})
//                   </div>
//                 </button>
//                 <p className="px-2 py-1 text-xs font-semibold text-white bg-gray-800 rounded">
//                   {meal.category}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UpcomingMeals;


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
          const response = await axios.get(`http://localhost:8000/user-subscriptions?email=${user.email}`);
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
