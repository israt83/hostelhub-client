


import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { format } from 'date-fns';

const AddUpcomingMealModal = ({ closeModal, isOpen, addMeal, adminName }) => {
  const [mealData, setMealData] = useState({
    title: '',
    image: '',
    price: '',
    category: '',
    rating: '',
    ingredients: '',
    description: '',
    adminName:  '', 
    postTime: format(new Date(), 'PPpp'), 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData({ ...mealData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const mealWithAdminInfo = {
      ...mealData,
      adminName, 
      postTime: format(new Date(), 'PPpp'), 
    };
    addMeal(mealWithAdminInfo);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  Add Upcoming Meal
                </Dialog.Title>

                <form onSubmit={handleSubmit}>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Meal Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={mealData.title}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={mealData.image}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={mealData.price}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={mealData.category}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={mealData.rating}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      min="1"
                      max="5"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Ingredients
                    </label>
                    <input
                      type="text"
                      name="ingredients"
                      value={mealData.ingredients}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={mealData.description}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  {/* Admin Name and Post Time */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Admin Name
                    </label>
                    <input
                      type="text"
                      name="adminName"
                      value={mealData.adminName}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Post Time
                    </label>
                    <input
                      type="text"
                      name="postTime"
                      value={mealData.postTime}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      disabled
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-orange-600 text-white font-semibold rounded-md"
                    >
                      Add Meal
                    </button>
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-gray-500"
                    onClick={closeModal}
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

AddUpcomingMealModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  addMeal: PropTypes.func.isRequired,
  adminName: PropTypes.string.isRequired, 
};

export default AddUpcomingMealModal;
