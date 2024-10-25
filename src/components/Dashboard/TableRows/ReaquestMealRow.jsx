



import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import DeleteModal from '../../Modal/DeleteModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../providers/AuthProvider';


const ReaquestMealRow = ({ request, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  // Get logged-in user data from AuthContext
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  // Delete Meal Request Mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/request-meal/${id}`);
      return data;
    },
    onSuccess: async () => {
      refetch();
      toast.success('Meal request canceled successfully');
      // Update meal status to false after canceling
      await axiosSecure.patch(`/meals/status/${request?.mealId}`, {
        status: false,
      });
    },
    onError: (error) => {
      console.error('Error canceling request:', error);
    },
  });

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await mutateAsync(id);
    } catch (error) {
      console.error('Error deleting meal request:', error);
    }
  };

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <img alt='meal' src={request?.image} className='mx-auto object-cover rounded h-20 w-28' />
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{request?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {/* Filter reviews by logged-in user's email */}
        {request?.reviews?.filter(review => review.user.email === userEmail).map((review, index) => (
          <div key={index} className="mb-2">
            <p className='text-gray-900'><strong></strong> {review.text}</p>
          </div>
        ))}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{request?.likes}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-orange-600'>{request?.status}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight'
        >
          <span className='absolute inset-0 bg-red-200 opacity-50 rounded-full'></span>
          <span className='relative'>Cancel</span>
        </button>
        {/* Delete Modal */}
        <DeleteModal handleDelete={handleDelete} closeModal={closeModal} isOpen={isOpen} id={request?._id} />
      </td>
    </tr>
  );
};

ReaquestMealRow.propTypes = {
  request: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ReaquestMealRow;
