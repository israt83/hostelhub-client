import { useState } from "react";
import Container from "../../components/Shared/Container";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Reviews = ({ id, existingReviews }) => {
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();

  const [reviewText, setReviewText] = useState("");
  const [reviewsCount, setReviewsCount] = useState(existingReviews?.length || 0);
  const [reviews, setReviews] = useState(Array.isArray(existingReviews) ? existingReviews : []);

  // Fetch the meal data including reviews
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meals", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/meals/${id}`);
      setReviewsCount(data.reviews?.length || 0); // Set the initial review count
      setReviews(data.reviews || []); // Initialize reviews from the meal data
      return data;
    },
    enabled: !!user, // Only fetch if user is logged in
  });

  // Handle review submission
  const handleReviewSubmit = async () => {
    if (!reviewText) return alert("Review cannot be empty");

    const reviewData = {
      review: reviewText,
      userId: user.uid, // Ensure this is correct
      userEmail: user.email,
      userName: user.displayName,
      postedAt: new Date(),
    };

    console.log("Submitting review with data: ", reviewData); // Debug log

    try {
      const { data } = await axiosCommon.post(`/meals/${id}/review`, reviewData);

      // Add the new review to the list of reviews
      setReviews([...reviews, reviewData]);
      setReviewsCount(reviewsCount + 1);
      setReviewText(""); // Clear the textarea

    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <Container>
      <div className="mt-10 px-32">
        <label htmlFor="Description" className="block text-lg text-black">
          Write a Review ({reviewsCount})
        </label>

        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="block mt-2 w-2/3 placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:ring-blue-300"
        ></textarea>

        <button
          onClick={handleReviewSubmit}  // Use onClick for the button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit Review
        </button>

        {/* Display reviews */}
        <div className="mt-5">
          {reviews.length > 0 ? (
            reviews.map((r, index) => (
              <div key={index} className="border-b pb-2">
                <p>
                  <strong>{r.userName}</strong> ({new Date(r.postedAt).toLocaleDateString()})
                </p>
                <p>{r.review}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p> // Handle empty reviews array case
          )}
        </div>
      </div>
    </Container>
  );
};

export default Reviews;
