

import PropTypes from "prop-types";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiViewBoard } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import { axiosCommon } from "../../../hooks/useAxiosCommon";
import UpdateReviewModal from "../../Modal/UpdateReviewModal";
import DeleteModal from "../../Modal/DeleteModal"; // Import DeleteModal

const MyReviewRow = ({ meal, user, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewIdToDelete, setReviewIdToDelete] = useState(null);

 
  const userReviews = meal?.reviews?.filter(
    (review) => review?.user?.email === user?.email
  );

  const openModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const openDeleteModal = (reviewId) => {
    setReviewIdToDelete(reviewId);
    setIsDeleteModalOpen(true);
  };

  const handleReviewUpdate = async (mealId, updatedReview) => {
    const token = localStorage.getItem("token");

    try {
      await axiosCommon.put(
        `/meals/reviews`,
        {
          reviewText: updatedReview,
          mealId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      refetch();
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const token = localStorage.getItem('token');
  
    try {
      await axiosCommon.delete('/meals/reviews', {
        data: { reviewId, mealId: meal._id }, 
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      refetch();
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };
  
  

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900">{meal?.title}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900">{meal?.like}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {userReviews?.map((review, index) => (
            <div key={index}>
              <p className="text-gray-900">{review?.text}</p>
            </div>
          ))}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <Link to={`/meals/${meal?._id}`}>
            <CiViewBoard className="w-10 h-6" />
          </Link>
        </td>
        <td className="px-8 py-5 border-b border-gray-200 bg-white text-sm">
          {userReviews?.map((review, index) => (
            <div key={index}>
              <button onClick={() => openModal(review)}>
                <FaRegEdit className="w-5 h-5 text-orange-600" />
              </button>
            </div>
          ))}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {userReviews?.map((review, index) => (
            <div key={index}>
              <button
                onClick={() => openDeleteModal(review._id)} // Open DeleteModal for the review
                className="relative inline-block px-3 py-1 font-semibold text-red-700 leading-tight"
              >
                <RiDeleteBin6Line className="w-10 h-5" />
              </button>
            </div>
          ))}
        </td>
      </tr>

      {/* Update Review Modal */}
      {selectedReview && (
        <UpdateReviewModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          existingReview={selectedReview} 
          handleReviewUpdate={handleReviewUpdate}
          id={meal._id} 
        />
      )}

      {/* Delete Review Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
          handleDelete={() => handleDeleteReview(reviewIdToDelete)} 
        />
      )}
    </>
  );
};

MyReviewRow.propTypes = {
  meal: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default MyReviewRow;
