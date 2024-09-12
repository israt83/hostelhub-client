// import PropTypes from 'prop-types'
// import { format } from 'date-fns'
// import { useState } from 'react'
// import {
//   Description,
//   Dialog,
//   DialogPanel,
//   DialogTitle,
// } from '@headlessui/react'
// import DeleteModal from '../../Modal/DeleteModal'
// import UpdateRoomModal from '../../Modal/UpdateRoomModal'
// const MealDataRow = ({ meal, refetch }) => {
//   // for delete modal
//   const [isOpen, setIsOpen] = useState(false)
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
//   const closeModal = () => {
//     setIsOpen(false)
//   }

//   // for update modal
//   return (
//     <tr>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <div className='flex items-center'>
//           <div className='flex-shrink-0'>
//             <div className='block relative'>
//               <img
//                 alt='profile'
//                 src={meal?.image}
//                 className='mx-auto object-cover rounded h-10 w-15 '
//               />
//             </div>
//           </div>
//           <div className='ml-3'>
//             <p className='text-gray-900 whitespace-no-wrap'>{meal?.title}</p>
//           </div>
//         </div>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 whitespace-no-wrap'>{meal?.location}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 whitespace-no-wrap'>${meal?.price}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 whitespace-no-wrap'>
//           {format(new Date(meal?.from), 'P')}
//         </p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 whitespace-no-wrap'>
//           {format(new Date(meal?.to), 'P')}
//         </p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <button
//           onClick={() => setIsOpen(true)}
//           className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
//         >
//           <span
//             aria-hidden='true'
//             className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
//           ></span>
//           <span className='relative'>Delete</span>
//         </button>
//         {/* Delete modal */}
//         {/* <DeleteModal
//           isOpen={isOpen}
//           closeModal={closeModal}
//           handleDelete={handleDelete}
//           id={meal?._id}
//         /> */}
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <button
//           onClick={() => setIsEditModalOpen(true)}
//           className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
//         >
//           <span
//             aria-hidden='true'
//             className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
//           ></span>
//           <span className='relative'>Update</span>
//         </button>
//         {/* Update Modal */}
//         {/* <UpdatemealModal
//           isOpen={isEditModalOpen}
//           setIsEditModalOpen={setIsEditModalOpen}
//           meal={meal}
//           refetch={refetch}
//         /> */}
//       </td>
//     </tr>
//   )
// }

// MealDataRow.propTypes = {
//   room: PropTypes.object,
//   refetch: PropTypes.func,
//   handleDelete: PropTypes.func,
// }

// export default MealDataRow

import PropTypes from "prop-types";
import { useState } from "react";
import { format } from "date-fns";
// import DeleteModal from '../../Modal/DeleteModal'
// import UpdateMealModal from '../../Modal/UpdateMealModal'

const MealDataRow = ({ meal, refetch, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
            <p className="text-gray-900 whitespace-no-wrap">{meal?.title}</p>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{meal?.likes}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{meal?.likes}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{meal?.reviews}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
         {meal.adminName}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </button>
        {/* Delete modal */}
        {/* <DeleteModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          handleDelete={() => handleDelete(meal?._id)}
        /> */}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </button>
        {/* Update modal */}
        {/* <UpdateMealModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          meal={meal}
          refetch={refetch}
        /> */}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">View</span>
        </button>
      </td>
    </tr>
  );
};

MealDataRow.propTypes = {
  meal: PropTypes.object,
  refetch: PropTypes.func,
  handleDelete: PropTypes.func,
}

export default MealDataRow;
