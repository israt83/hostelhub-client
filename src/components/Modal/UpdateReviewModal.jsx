






import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

const UpdateReviewModal = ({
  closeModal,
  isOpen,
  existingReview,
  handleReviewUpdate,
  id, 
}) => {
const [review, setReview] = useState(existingReview?.text || "");

useEffect(() => {
  setReview(existingReview?.text || ""); 
}, [existingReview]);

const handleSubmit = () => {
  if (review.trim()) {
    handleReviewUpdate(id, review);  
    closeModal(); 
  } else {
    alert("Please enter a valid review!");
  }
};

return (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={() => {}}>
      <Transition.Child as={Fragment}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child as={Fragment}>
            <Dialog.Panel className="w-full max-w-md bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                Edit Review
              </Dialog.Title>
              <div className="mt-2">
                <textarea
                  className="w-full p-2 border rounded"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Update your review..."
                />
              </div>
              <div className="flex mt-4 justify-end gap-2">
                <button
                  onClick={handleSubmit}
                  className="bg-green-100 px-4 py-2 text-green-900 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-100 px-4 py-2 text-red-900 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);
};

  

UpdateReviewModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleReviewUpdate: PropTypes.func.isRequired,
  reviewId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  existingReview: PropTypes.object.isRequired, 
};

export default UpdateReviewModal;
