// import Container from '../../components/Shared/Container'
// import { Helmet } from 'react-helmet-async'
// // import RoomReservation from '../../components/RoomDetails/RoomReservation'
// import Heading from '../../components/Shared/Heading'
// import { useQuery } from '@tanstack/react-query'
// import { useParams } from 'react-router-dom'
// import LoadingSpinner from '../../components/Shared/LoadingSpinner'
// import useAxiosCommon from '../../hooks/useAxiosCommon'

// const MealDetails = () => {
//   const { id } = useParams()
//   const axiosCommon = useAxiosCommon()

//   const {
//     data: meal = {},
//     isLoading,
//     // refetch,
//   } = useQuery({
//     queryKey: ['meals', id],
//     queryFn: async () => {
//       const { data } = await axiosCommon.get(`/meals/${id}`)
//       return data
//     },
//   })

//   if (isLoading) return <LoadingSpinner />
//   console.log(meal)
//   return (
//     <Container>
//       <Helmet>
//         <title>{meal?.title}</title>
//       </Helmet>
//       {meal && (
//         <div className='max-w-screen-lg mx-auto'>
//           {/* Header */}
//           <div className='flex flex-col gap-6'>
//             <div>
//               <Heading title={meal.title} subtitle={meal.location} />
//               <div className='w-full md:h-[60vh] overflow-hidden rounded-xl'>
//                 <img
//                   className='object-cover w-full'
//                   src={meal.image}
//                   alt='header image'
//                 />
//               </div>
//             </div>
//           </div>
//           <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
//             {/* Room Info */}
//             <div className='col-span-4 flex flex-col gap-8'>
//               <div className='flex flex-col gap-2'>
//                 <div
//                   className='
//                 text-xl
//                 font-semibold
//                 flex
//                 flex-row
//                 items-center
//                 gap-2
//               '
//                 >
//                   <div>Hosted by {meal?.host?.name}</div>

//                   <img
//                     className='rounded-full'
//                     height='30'
//                     width='30'
//                     alt='Avatar'
//                     referrerPolicy='no-referrer'
//                     src={meal?.host?.image}
//                   />
//                 </div>
//                 <div
//                   className='
//                 flex
//                 flex-row
//                 items-center
//                 gap-4
//                 font-light
//                 text-neutral-500
//               '
//                 >
//                   <div>{meal?.guests} guests</div>
//                   <div>{meal?.bedmeals} rooms</div>
//                   <div>{meal?.bathmeals} bathmeals</div>
//                 </div>
//               </div>

//               <hr />
//               <div
//                 className='
//           text-lg font-light text-neutral-500'
//               >
//                 {meal?.description}
//               </div>
//               <hr />
//             </div>

//             <div className='md:col-span-3 order-first md:order-last mb-10'>
//               {/* RoomReservation */}
//               {/* <RoomReservation refetch={refetch} meal={meal} /> */}
//             </div>
//           </div>
//         </div>
//       )}
//     </Container>
//   )
// }

// export default MealDetails

// import Container from "../../components/Shared/Container";
// import Heading from "../../components/Shared/Heading";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import useAxiosCommon from "../../hooks/useAxiosCommon";
// import { useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import RatingStars from "./RatingStars";
// import { AiOutlineLike } from "react-icons/ai";

// const MealDetails = () => {
//   const { id } = useParams();
//   const axiosCommon = useAxiosCommon();
//   const { user, isAuthenticated } = useAuth();
//   const queryClient = useQueryClient();
//   const [likeCount, setLikeCount] = useState(0);
//   const [userReview, setUserReview] = useState("");

//   // Fetch meal details
//   const { data: meal = {}, isLoading } = useQuery({
//     queryKey: ["meals", id],
//     queryFn: async () => {
//       const { data } = await axiosCommon.get(`/meals/${id}`);
//       setLikeCount(data.like || 0); // Set the initial like count
//       return data;
//     },
//   });

//   const handleLikeCount = async () => {
//     if (user && user.email) {
//       try {
//         // Send a request to increment the like count
//         await axiosCommon.patch(`/meals/${id}`);

//         // Increment the like count locally
//         setLikeCount((prevCount) => prevCount + 1);

//         // Refetch meal data to ensure the like count is up-to-date
//         queryClient.invalidateQueries(["meals", id]);
//       } catch (error) {
//         console.error("Error updating likes:", error);
//       }
//     } else {
//       alert("You need to log in to like this meal.");
//     }
//   };

//   const handleReviewSubmit = async () => {
//     if (!userReview) return;
//     await axiosCommon.post(`/meals/${id}/reviews`, {
//       review: userReview,
//       userId: user?.id,
//     });
//     setUserReview("");
//     queryClient.invalidateQueries(["meals", id]);
//   };

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <Container>
//       {meal && (
//         <div className=" max-w-[2520px] mx-auto xl:px-20 lg:ml-8 md:px-10 sm:px-2 px-4 mt-5">
//           {/* Header */}
//           <div className="flex flex-col gap-6">
//             <div>
//               <Heading title={meal.title} subtitle={meal.location} />
//               <div className="w-full md:h-full overflow-hidden rounded-xl">
//                 <img
//                   className="object-cover w-full h-full"
//                   src={meal.image}
//                   alt="header image"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
//             {/* Meal Info */}
//             <div className="col-span-4 flex flex-col ">
//               <div className="text-base font-medium text-gray-700">
//                 Hosted by : {meal?.adminName}
//               </div>

//               <hr className="py-3 mt-4" />
//               {/* Ingredients */}
//               <div className="text-lg font-light text-neutral-500">
//                 <h3 className="font-semibold text-orange-600">
//                   <span className="text-black">Ingredients</span> :
//                   {meal?.ingredients}
//                 </h3>
//               </div>
//               <div className="text-lg font-light text-neutral-700 py-2">
//                 {meal?.description}
//               </div>

//               {/* Post time and Rating */}
//               <div className="text-lg font-semibold  text-neutral-500">
//                 <div>
//                   Posted on: {new Date(meal?.postTime).toLocaleDateString()}
//                 </div>
//                 <div className="mt-2 flex space-x-2">
//                   <p>{meal.rating} </p>
//                   <p className="mt-1">
//                     <RatingStars rating={meal.rating} />
//                     {/* <RatingStars> rating={meal.rating}</RatingStars> */}
//                   </p>
//                   <p className="px-6 text-orange-600">5 ratings</p>
//                 </div>
//               </div>
//               <hr className="mt-3 pb-2" />

//               <div className="flex justify-end gap-3">
//                 {/* Like Button */}
//                 <div>
//                   <button
//                     className="bg-blue-600 mt-4 px-4 py-2 rounded text-white"
//                     onClick={handleLikeCount}
//                   >
//                     <div className="flex gap-1">
//                       <AiOutlineLike className="mt-1" />({likeCount}){" "}
//                       {/* Display the updated like count */}
//                     </div>
//                   </button>
//                 </div>

//                 {/* Meal Request Button */}
//                 <div>
//                   <button
//                     // onClick={handleMealRequest}
//                     className={`mt-4 px-4 py-2 bg-orange-500 text-white rounded ${
//                       isAuthenticated ? "" : " cursor-not-allowed"
//                     }`}
//                     disabled={!isAuthenticated}
//                   >
//                     Request Meal
//                   </button>
//                 </div>
//               </div>

//               {/* Reviews */}
//               <div className="mt-8">
//                 <h3 className="font-semibold text-xl">Reviews</h3>

//                 {/* Review Input */}

//                 <div className="mt-4">
//                   <textarea
//                     className="w-full p-2 border rounded"
//                     value={userReview}
//                     onChange={(e) => setUserReview(e.target.value)}
//                     placeholder="Write a review..."
//                   />
//                   <button
//                     onClick={handleReviewSubmit}
//                     className="mt-2 px-4 py-2 bg-orange-500 text-white rounded"
//                   >
//                     Submit Review
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="md:col-span-3 order-first md:order-last mb-10">
//               {/* Additional content if needed */}
//             </div>
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default MealDetails;

import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import RatingStars from "./RatingStars";
import { AiOutlineLike } from "react-icons/ai";



const MealDetails = () => {
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [likeCount, setLikeCount] = useState(0);

  const [isLiked, setIsLiked] = useState(false);

  // Fetch meal details
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meals", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/meals/${id}`);
      setLikeCount(data.like || 0); // Set the initial like count
      setIsLiked(data.likedUsers?.includes(user?.email)); // Check if the user already liked
      return data;
    },
    enabled: !!user, // Only fetch if user is logged in
  });

  const handleLikeCount = async () => {
    if (!user || !user.email) {
      alert("You need to log in to like this meal.");
      return;
    }
    if (isLiked) {
      alert("You have already liked this meal.");
      return;
    }

    try {
      // Send a request to increment the like count
      await axiosCommon.patch(`/meals/${id}`, { email: user.email });

      // Update the like count locally
      setLikeCount((prevCount) => prevCount + 1);
      setIsLiked(true); // Prevent multiple likes

      // Refetch meal data to ensure the like count is up-to-date
      queryClient.invalidateQueries(["meals", id]);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };
  const handleMealRequest = async () => {
    if (!user || !isAuthenticated) {
      alert(
        "You need to log in and have a package subscription to request this meal."
      );
      return;
    }

    try {
      const response = await axiosCommon.post(`/meals/${id}/request`, {
        userId: user.id,
        mealId: meal.id,
        status: "pending", // Initial request status
      });

      alert("Meal request sent successfully. Status: Pending");
    } catch (error) {
      console.error("Error requesting meal:", error);
      alert("There was an error with your request.");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      {meal && (
        <div className="max-w-[2520px] mx-auto xl:px-20 lg:ml-8 md:px-10 sm:px-2 px-4 mt-5">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <div>
              <Heading title={meal.title} subtitle={meal.location} />
              <div className="w-full md:h-full overflow-hidden rounded-xl">
                <img
                  className="object-cover w-full h-full"
                  src={meal.image}
                  alt="header image"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            {/* Meal Info */}
            <div className="col-span-4 flex flex-col">
              <div className="text-base font-medium text-gray-700">
                Hosted by: {meal?.adminName}
              </div>

              <hr className="py-3 mt-4" />
              {/* Ingredients */}
              <div className="text-lg font-light text-neutral-500">
                <h3 className="font-semibold text-orange-600">
                  <span className="text-black">Ingredients</span>:{" "}
                  {meal?.ingredients}
                </h3>
              </div>

              <div className="text-lg font-light text-neutral-700 py-2">
                {meal?.description}
              </div>

              {/* Post time and Rating */}
              <div className="text-lg font-semibold text-neutral-500">
                <div>
                  Posted on: {new Date(meal?.postTime).toLocaleDateString()}
                </div>
                <div className="mt-2 flex space-x-2">
                  <p>{meal.rating}</p>
                  <p className="mt-1">
                    <RatingStars rating={meal.rating} />
                  </p>
                  <p className="px-6 text-orange-600">5 ratings</p>
                </div>
              </div>
              <hr className="mt-3 pb-2" />

              {/* Like Button */}
              <div className="flex justify-end gap-3">
                <div>
                  <button
                    className={`mt-4 px-4 py-2 rounded text-white ${
                      isLiked ? "bg-blue-600" : "bg-gray-400"
                    }`}
                    onClick={handleLikeCount}
                    disabled={isLiked} // Disable if already liked
                  >
                    <div className="flex gap-1">
                      <AiOutlineLike className="mt-1" /> ({likeCount})
                    </div>
                  </button>
                </div>

                {/* Meal Request Button */}
                <div>
                  <button
                    onClick={handleMealRequest}
                    className={`mt-4 px-4 py-2 bg-orange-500 text-white rounded ${
                      !isAuthenticated ? "cursor-not-allowed" : ""
                    }`}
                    disabled={!isAuthenticated}
                  >
                    Request Meal
                  </button>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3 order-first md:order-last mb-10">
              {/* Additional content if needed */}
            </div>
          </div>
          {/* <Reviews id={id} existingReviews={meal.reviews} /> */}
          <Link to="review">Write a Reviews</Link>
          <p>{meal.reviews}</p>
        </div>
      )}
    </Container>
  );
};

export default MealDetails;
