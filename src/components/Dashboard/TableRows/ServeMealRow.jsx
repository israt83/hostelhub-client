import PropTypes from 'prop-types';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ServeModal from '../../Modal/ServeModal'; 

const ServeMealRow = ({ request, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  // Serve Meal Request Mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/request-meal/${id}`);
      return data;
    },
    onSuccess: async () => {
      refetch();
      toast.success('Meal request served successfully');
    },
    onError: (error) => {
      console.error('Error serving meal request:', error);
      toast.error('Failed to serve meal request');
    },
  });

  // Handle Serve
  const handleServe = async (id) => {
    try {
      await mutateAsync(id);
    } catch (error) {
      console.error('Error serving meal request:', error);
    }
  };

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <img alt='meal' src={request?.image} className='mx-auto object-cover rounded h-10 w-15' />
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{request?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
      <p className='text-gray-900 text-base font-semibold'>{request?.userName}</p>
        <p className='text-gray-900'>{request?.email}</p>
       
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
          className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
          <span className='relative'>Serve</span>
        </button>
        {/* Serve Modal */}
        <ServeModal handleServe={() => handleServe(request._id)} closeModal={closeModal} isOpen={isOpen} id={request._id} />
      </td>
    </tr>
  );
};

ServeMealRow.propTypes = {
  request: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ServeMealRow;
