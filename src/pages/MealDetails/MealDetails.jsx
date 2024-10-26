// import Container from "../../components/Shared/Container";
// import Heading from "../../components/Shared/Heading";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Link, useParams } from "react-router-dom";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import useAxiosCommon from "../../hooks/useAxiosCommon";
// import { useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import RatingStars from "./RatingStars";
// import { AiOutlineLike } from "react-icons/ai";
// import Swal from "sweetalert2";
// import { axiosSecure } from "../../hooks/useAxiosSecure";
// import useMeal from "../../hooks/useMeal";
// import { BsThreeDotsVertical } from "react-icons/bs";
// // import toast from "react-hot-toast";
// import ReviewModal from "../../components/Modal/ReviewModal";
// import "react-tooltip/dist/react-tooltip.css";
// import { Tooltip } from "react-tooltip";

// const MealDetails = () => {
//   const { id } = useParams();
//   const axiosCommon = useAxiosCommon();
//   const { user } = useAuth();
//   const queryClient = useQueryClient();
//   const [likeCount, setLikeCount] = useState(0);

//   const [isLiked, setIsLiked] = useState(false);
//   const [, refetch] = useMeal();

//   const [isOpen, setIsOpen] = useState(false);
//   const closeModal = () => setIsOpen(false);

//   const { mutateAsync: submitReview } = useMutation({
//     mutationFn: async (reviewData) => {
//       const { id, review } = reviewData;
//       await axiosCommon.post(`/meals/${id}/reviews`, { review });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["meals", id]);
//     },
//   });

//   const handleReviewSubmit = async (mealId, reviewText) => {
//     try {
//       const reviewData = {
//         text: reviewText,
//         userName: user.displayName || "Anonymous",
//         userEmail: user.email || "",
//         userImage: user.photoURL || "",
//       };
//       await submitReview({ id: mealId, review: reviewData }); // Wrap reviewData in a review object
//     } catch (error) {
//       console.error("Error submitting review:", error);
//     }
//   };

//   const { data: meal, isLoading } = useQuery({
//     queryKey: ["meals", id],
//     queryFn: async () => {
//       const { data } = await axiosCommon.get(`/meals/${id}`);
//       console.log("Meal data:", data); // Log to verify structure
//       setLikeCount(data.like || 0);
//       setIsLiked(data.likedUsers?.includes(user?.email));
//       return data;
//     },
//     enabled: !!user,
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
//       // Send a request to increment the like count
//       await axiosCommon.patch(`/meals/${id}`, { email: user.email });

//       // Update the like count locally
//       setLikeCount((prevCount) => prevCount + 1);
//       setIsLiked(true); // Prevent multiple likes

//       // Refetch meal data to ensure the like count is up-to-date
//       queryClient.invalidateQueries(["meals", id]);
//     } catch (error) {
//       console.error("Error updating likes:", error);
//     }
//   };

//   const handleMealRequest = () => {
//     if (user && user.email) {
//       // Send cart item to the database
//       const cartItem = {
//         menuId: id,
//         email: user.email,

//         name: meal?.title,
//         image: meal?.image,
//         price: meal?.price,
//         likes: likeCount,
//         reviews: meal?.reviews,
//         status: "Requested",
//       };

//       axiosSecure
//         .post("/request-meal", cartItem)
//         .then((res) => {
//           if (res.data.insertedId) {
//             Swal.fire({
//               position: "top-end",
//               icon: "success",
//               title: `${meal?.title} added to your Reaquest Meal`,
//               showConfirmButton: false,
//               timer: 1500,
//             });
//             // Refetch cart to update the cart items count
//             refetch();
//           }
//         })
//         .catch((error) => {
//           console.error("Error adding meal to cart:", error);
//         });
//     } else {
//       Swal.fire({
//         title: "You are not Logged In",
//         text: "Please login to add to the cart?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, login!",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Send the user to the login page
//           navigator("/login", { state: { from: location } });
//         }
//       });
//     }
//   };

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <Container>
//       {meal && (
//         <div className="max-w-[2520px] mx-auto xl:px-20 lg:ml-8 md:px-10 sm:px-2 px-4 mt-5">
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
//             <div className="col-span-4 flex flex-col">
//               <div className="text-base font-medium text-gray-700">
//                 Hosted by: {meal?.adminName}
//               </div>

//               <hr className="py-3 mt-4" />
//               {/* Ingredients */}
//               <div className="text-lg font-light text-neutral-500">
//                 <h3 className="font-semibold text-orange-600">
//                   <span className="text-black">Ingredients</span>:{" "}
//                   {meal?.ingredients}
//                 </h3>
//               </div>

//               <div className="text-lg font-light text-neutral-700 py-2">
//                 {meal?.description}
//               </div>

//               {/* Post time and Rating */}
//               <div className="text-lg font-semibold text-neutral-500">
//                 <div>
//                   Posted on: {new Date(meal?.postTime).toLocaleDateString()}
//                 </div>
//                 <div className="mt-2 flex space-x-2">
//                   <p>{meal.rating}</p>
//                   <p className="mt-1">
//                     <RatingStars rating={meal.rating} />
//                   </p>
//                   <p className="px-6 text-orange-600">5 ratings</p>
//                 </div>
//               </div>
//               <hr className="mt-3 pb-2" />

//               {/* Like Button */}
//               <div className="flex justify-end gap-3">
//                 <div>
//                   <button
//                     className={`mt-4 px-4 py-2 rounded text-white ${
//                       isLiked ? "bg-blue-600" : "bg-gray-400"
//                     }`}
//                     onClick={handleLikeCount}
//                     disabled={isLiked} // Disable if already liked
//                   >
//                     <div className="flex gap-1">
//                       <AiOutlineLike className="mt-1" /> ({likeCount})
//                     </div>
//                   </button>
//                 </div>

//                 {/* Meal Request Button */}
//                 <div>
//                   <button
//                     onClick={handleMealRequest}
//                     className="mt-4 px-4 py-2 bg-orange-500 text-white rounded "
//                   >
//                     Request Meal
//                   </button>
//                 </div>
//                 <div className="md:col-span-3 order-first md:order-last mb-10"></div>
//               </div>
//             </div>
//           </div>
//           {/* <Reviews id={id} existingReviews={meal.reviews} /> */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="relative inline-block px-3 py-1 font-semibold leading-tight"
//           >
//             <span className="absolute inset-0 opacity-50 rounded-full"></span>
//             <span className="relative">Write a review</span>
//           </button>

//           <ReviewModal
//             handleReviewSubmit={handleReviewSubmit}
//             closeModal={closeModal}
//             isOpen={isOpen}
//             id={meal._id}
//           />

//           {/* Render reviews */}
//           <div>
//             <h3 className="text-lg font-semibold mt-6">Reviews:</h3>
//             {meal.reviews?.length ? (
//               meal.reviews.map((review, index) => (
//                 <div key={index} className="my-3 p-2  flex items-start">
//                   {review.user.image && (
//                     <img
//                       src={review.user.image}
//                       alt={review.user.name}
//                       className="w-8 h-8 rounded-full mr-2"
//                     />
//                   )}
//                   <div>
//                     <div className="flex justify-between">
//                       <div className="flex gap-4">
//                         <img
//                           alt="profile"
//                           src={review.user?.photoURL}
//                           className=" object-cover rounded-full h-12 w-12 border-2 border-white"
//                         />
//                         <div>
//                           <p className="mt-">
//                             {" "}
//                             <strong>
//                               {review.user.displayName || "Anonymous"}
//                             </strong>
//                           </p>
//                           <small>
//                             {new Date(review.createdAt).toLocaleString()}
//                           </small>
//                         </div>
//                       </div>
//                       <a
//                         data-tooltip-id="my-tooltip"
//                         data-tooltip-content="view Review!"
//                         // onClick={() => openUpdateModal(review)}
//                       >
//                         <Tooltip id="my-tooltip" />
//                         <Link to='/dashboard/my-reviews'>
//                           <BsThreeDotsVertical className="" />
//                         </Link>
//                       </a>
//                     </div>
//                     <p className="mt-2 text-sm">{review.text}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No reviews yet.</p>
//             )}
//           </div>

//           {/* Update Review Modal
//           {selectedReview && (
//             <UpdateReviewModal
//               isOpen={isUpdateModalOpen}
//               closeModal={closeUpdateModal}
//               reviewId={selectedReview._id} // Pass the review ID
//               existingReview={selectedReview} // Pass the selected review
//               handleReviewUpdate={handleReviewUpdate} // Pass the update handler
//               id={meal._id} // Pass the meal ID
//             />
//           )} */}
//         </div>
//       )}
//     </Container>
//   );
// };

// export default MealDetails;

import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import RatingStars from "./RatingStars";
import { AiOutlineLike } from "react-icons/ai";
import Swal from "sweetalert2";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import useMeal from "../../hooks/useMeal";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReviewModal from "../../components/Modal/ReviewModal";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import axios from "axios";

const MealDetails = () => {
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [, refetch] = useMeal();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const [subscribedPackages, setSubscribedPackages] = useState([]);


  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (user?.email) {
        try {
          const response = await axios.get(`https://hostel-management-system-server-six.vercel.app/user-subscriptions?email=${user.email}`);
          setSubscribedPackages(response.data.subscribedPackages || []); // Set the subscribed packages in state
        } catch (error) {
          console.error('Error fetching subscriptions:', error);
        }
      }
    };

    fetchSubscriptions();
  }, [user]);

  const { mutateAsync: submitReview } = useMutation({
    mutationFn: async (reviewData) => {
      const { id, review } = reviewData;
      await axiosCommon.post(`/meals/${id}/reviews`, { review });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["meals", id]);
    },
  });

  const handleReviewSubmit = async (mealId, reviewText) => {
    try {
      const reviewData = {
        text: reviewText,
        userName: user.displayName || "Anonymous",
        userEmail: user.email || "",
        userImage: user.photoURL || "",
      };

      console.log("Submitting review:", reviewData); // Log the review data
      await submitReview({ id: mealId, review: reviewData });
    } catch (error) {
      console.error("Error submitting review:", error); // Log the error to see details
    }
  };

  const { data: meal, isLoading } = useQuery({
    queryKey: ["meals", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/meals/${id}`);
      setLikeCount(data.like || 0);
      setIsLiked(data.likedUsers?.includes(user?.email));
      return data;
    },
    enabled: !!user,
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
      await axiosCommon.patch(`/meals/${id}`, { email: user.email });
      setLikeCount((prevCount) => prevCount + 1);
      setIsLiked(true);
      queryClient.invalidateQueries(["meals", id]);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

 
  const handleMealRequest = () => {
    if (subscribedPackages.length === 0) {
      Swal.fire("Please subscribe to a package to request this meal.", "", "warning");
      return;
    }

    if (user && user.email) {
      const cartItem = {
        menuId: id,
        email: user.email,
        userName: user.displayName,
        name: meal?.title,
        image: meal?.image,
        price: meal?.price,
        category: meal?.category,
        likes: likeCount,
        reviews: meal?.reviews,
        status: "Requested",
      };

      axiosSecure
        .post("/request-meal", cartItem)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${meal?.title} added to your Request Meal`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        })
        .catch((error) => {
          console.error("Error adding meal to cart:", error);
        });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to request the meal.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigator("/login", { state: { from: location } });
        }
      });
    }
  };


  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      {meal && (
        <div className="max-w-[2520px] mx-auto xl:px-20 lg:ml-8 md:px-10 sm:px-2 px-4 mt-5">
          <div className="flex flex-col gap-6">
            <div>
              <div className="grid grid-cols-2 space-x-80">
                <Heading title={meal.title} subtitle={meal.location} />
                <button className="px-3 py-1 mb-2 text-xs text-orange-800 uppercase bg-orange-200 rounded-full dark:bg-orange-300 dark:text-orange-900 ">
                  <p className="">{meal?.category}</p>
                </button>
              </div>

              <div className="w-full md:h-full overflow-hidden rounded-xl relative">
                <img
                  className="object-cover w-full h-full"
                  src={meal.image}
                  alt="header image"
                />
                <p className="absolute top-3 right-4 px-6 py-2 bg-slate-900 text-white rounded">
                  ${meal?.price}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <div className="col-span-4 flex flex-col">
              <div className="text-base font-medium text-gray-700">
                Hosted by: {meal?.adminName}
              </div>
              <hr className="py-3 mt-4" />

              <div className="text-lg font-light text-neutral-500">
                <h3 className="font-semibold text-orange-600">
                  <span className="text-black">Ingredients</span>:{" "}
                  {meal?.ingredients}
                </h3>
              </div>
              <div className="text-lg font-light text-neutral-700 py-2">
                {meal?.description}
              </div>

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

              <div className="flex justify-end gap-3">
                <button
                  className={`mt-4 px-4 py-2 rounded text-white ${
                    isLiked ? "bg-blue-600" : "bg-gray-400"
                  }`}
                  onClick={handleLikeCount}
                  disabled={isLiked}
                >
                  <div className="flex gap-1">
                    <AiOutlineLike className="mt-1" /> ({likeCount})
                  </div>
                </button>

                {/* <button
                  onClick={handleMealRequest}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded "
                >
                 
                </button> */}

                <button
                  onClick={handleMealRequest}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded "
                >
                  {subscribedPackages.length > 0
                    ? "Request Meal"
                    : " Request Meal"}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="relative inline-block px-3 py-1 font-semibold leading-tight"
          >
            <span className="absolute inset-0 opacity-50 rounded-full"></span>
            <span className="relative">Write a review</span>
          </button>

          <ReviewModal
            handleReviewSubmit={handleReviewSubmit}
            closeModal={closeModal}
            isOpen={isOpen}
            id={meal._id}
          />

          {/* Render reviews */}
          <div>
            <h3 className="text-lg font-semibold mt-6">Reviews:</h3>
            {Array.isArray(meal.reviews) && meal.reviews.length ? (
              meal.reviews.map((review, index) => (
                <div key={index} className="my-3 p-2  flex items-start">
                  {review.user.image && (
                    <img
                      src={review.user.image}
                      alt={review.user.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <div>
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <img
                          alt="profile"
                          src={review.user?.photoURL}
                          className=" object-cover rounded-full h-12 w-12 border-2 border-white"
                        />
                        <div>
                          <p className="mt-">
                            {" "}
                            <strong>
                              {review.user.displayName || "Anonymous"}
                            </strong>
                          </p>
                          <small>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                      <div className="flex text-xl gap-2">
                        <span>
                          <a
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="view Review!"
                            // onClick={() => openUpdateModal(review)}
                          >
                            <Tooltip id="my-tooltip" />
                            <Link to="/dashboard/my-reviews">
                              <BsThreeDotsVertical className="" />
                            </Link>
                          </a>
                        </span>
                      </div>
                    </div>
                    <p>{review.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default MealDetails;

// import Container from "../../components/Shared/Container";
// import Heading from "../../components/Shared/Heading";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Link, useParams } from "react-router-dom";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import useAxiosCommon from "../../hooks/useAxiosCommon";
// import { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import RatingStars from "./RatingStars";
// import { AiOutlineLike } from "react-icons/ai";
// import Swal from "sweetalert2";
// import { axiosSecure } from "../../hooks/useAxiosSecure";
// import useMeal from "../../hooks/useMeal";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import ReviewModal from "../../components/Modal/ReviewModal";
// import "react-tooltip/dist/react-tooltip.css";
// import { Tooltip } from "react-tooltip";
// import axios from "axios";

// const MealDetails = () => {
//   const { id } = useParams();
//   const axiosCommon = useAxiosCommon();
//   const { user } = useAuth();
//   const queryClient = useQueryClient();
//   const [likeCount, setLikeCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [, refetch] = useMeal();
//   const [isOpen, setIsOpen] = useState(false);
//   const closeModal = () => setIsOpen(false);
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

//   const { mutateAsync: submitReview } = useMutation({
//     mutationFn: async (reviewData) => {
//       const { id, review } = reviewData;
//       await axiosCommon.post(`/meals/${id}/reviews`, { review });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["meals", id]);
//     },
//   });

//   const handleReviewSubmit = async (mealId, reviewText) => {
//     try {
//       const reviewData = {
//         text: reviewText,
//         userName: user.displayName || "Anonymous",
//         userEmail: user.email || "",
//         userImage: user.photoURL || "",
//       };

//       await submitReview({ id: mealId, review: reviewData });
//     } catch (error) {
//       console.error("Error submitting review:", error);
//     }
//   };

//   const { data: meal, isLoading } = useQuery({
//     queryKey: ["meals", id],
//     queryFn: async () => {
//       const { data } = await axiosCommon.get(`/meals/${id}`);
//       setLikeCount(data.like || 0);
//       setIsLiked(data.likedUsers?.includes(user?.email));
//       return data;
//     },
//     enabled: !!user,
//   });

//   const handleLikeCount = async () => {
//     if (!user || !user.email) {
//       Swal.fire("You need to log in to like this meal.", "", "warning");
//       return;
//     }
//     if (isLiked) {
//       Swal.fire("You have already liked this meal.", "", "info");
//       return;
//     }

//     try {
//       await axiosCommon.patch(`/meals/${id}`, { email: user.email });
//       setLikeCount((prevCount) => prevCount + 1);
//       setIsLiked(true);
//       queryClient.invalidateQueries(["meals", id]);
//     } catch (error) {
//       console.error("Error updating likes:", error);
//     }
//   };

//   const handleMealRequest = () => {
//     if (subscribedPackages.length === 0) {
//       Swal.fire("Please subscribe to a package to request this meal.", "", "warning");
//       return;
//     }

//     if (user && user.email) {
//       const cartItem = {
//         menuId: id,
//         email: user.email,
//         userName: user.displayName,
//         name: meal?.title,
//         image: meal?.image,
//         price: meal?.price,
//         category: meal?.category,
//         likes: likeCount,
//         reviews: meal?.reviews,
//         status: "Requested",
//       };

//       axiosSecure
//         .post("/request-meal", cartItem)
//         .then((res) => {
//           if (res.data.insertedId) {
//             Swal.fire({
//               position: "top-end",
//               icon: "success",
//               title: `${meal?.title} added to your Request Meal`,
//               showConfirmButton: false,
//               timer: 1500,
//             });
//             refetch();
//           }
//         })
//         .catch((error) => {
//           console.error("Error adding meal to cart:", error);
//         });
//     } else {
//       Swal.fire({
//         title: "You are not Logged In",
//         text: "Please login to request the meal.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, login!",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigator("/login", { state: { from: location } });
//         }
//       });
//     }
//   };

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <Container>
//       {meal && (
//         <div className="max-w-[2520px] mx-auto xl:px-20 lg:ml-8 md:px-10 sm:px-2 px-4 mt-5">
//           <div className="flex flex-col gap-6">
//             <div>
//               <div className="grid grid-cols-2 space-x-80">
//                 <Heading title={meal.title} subtitle={meal.location} />
//                 <button className="px-3 py-1 mb-2 text-xs text-orange-800 uppercase bg-orange-200 rounded-full dark:bg-orange-300 dark:text-orange-900 ">
//                   <p className="">{meal?.category}</p>
//                 </button>
//               </div>

//               <div className="w-full md:h-full overflow-hidden rounded-xl relative">
//                 <img
//                   className="object-cover w-full h-full"
//                   src={meal.image}
//                   alt="header image"
//                 />
//                 <p className="absolute top-3 right-4 px-6 py-2 bg-slate-900 text-white rounded">
//                   ${meal?.price}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
//             <div className="col-span-4 flex flex-col">
//               <div className="text-base font-medium text-gray-700">
//                 Hosted by: {meal?.adminName}
//               </div>
//               <hr className="py-3 mt-4" />

//               <div className="text-lg font-light text-neutral-500">
//                 <h3 className="font-semibold text-orange-600">
//                   <span className="text-black">Ingredients</span>:{" "}
//                   {meal?.ingredients}
//                 </h3>
//               </div>
//               <div className="text-lg font-light text-neutral-700 py-2">
//                 {meal?.description}
//               </div>

//               <div className="text-lg font-semibold text-neutral-500">
//                 <div>
//                   Posted on: {new Date(meal?.postTime).toLocaleDateString()}
//                 </div>
//                 <div className="mt-2 flex space-x-2">
//                   <p>{meal.rating}</p>
//                   <p className="mt-1">
//                     <RatingStars rating={meal.rating} />
//                   </p>
//                   <p className="px-6 text-orange-600">5 ratings</p>
//                 </div>
//               </div>
//               <hr className="mt-3 pb-2" />

//               <div className="flex justify-end gap-3">
//                 <button
//                   className={`mt-4 px-4 py-2 rounded text-white ${
//                     isLiked ? "bg-blue-600" : "bg-gray-400"
//                   }`}
//                   onClick={handleLikeCount}
//                   disabled={isLiked}
//                 >
//                   <div className="flex gap-1">
//                     <AiOutlineLike className="mt-1" /> ({likeCount})
//                   </div>
//                 </button>

//                 <button
//                   onClick={handleMealRequest}
//                   className="mt-4 px-4 py-2 bg-orange-500 text-white rounded "
//                 >
//                   {subscribedPackages.length > 0 ? "Request Meal" : "Cannot Request Meal"}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={() => setIsOpen(true)}
//             className="relative inline-block px-3 py-1 font-semibold leading-tight"
//           >
//             <span className="absolute inset-0 opacity-50 rounded-full"></span>
//             <span className="relative">
//               <BsThreeDotsVertical />
//             </span>
//           </button>
//           <ReviewModal
//             isOpen={isOpen}
//             onClose={closeModal}
//             mealId={meal?._id}
//             onReviewSubmit={handleReviewSubmit}
//           />
//         </div>
//       )}
//     </Container>
//   );
// };

// export default MealDetails;
