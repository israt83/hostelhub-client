// import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

// const Card = ({ meal }) => {
//   return (
//     <Link to={`/meals/${meal?._id}`} className='col-span-1 cursor-pointer group'>
//       <div className='flex flex-col items-center'>
//         <div
//           className='
//               aspect-square 
//               w-56
//               relative 
//               overflow-hidden 
//               rounded-xl
//             '
//         >
//           <img
//             className='
//                 object-cover 
//                 h-full 
//                 w-full 
//                 group-hover:scale-110 
//                 transition
//               '
//             src={meal?.image}
//             alt='meal'
//           />
//           <div
//             className='
//               absolute
//               top-3
//               right-3
//             '
//           ></div>
//         </div>
//         {/* <div className='font-semibold text-lg'>{meal?.location}</div> */}
//         <div className='font-bold py-3 text-neutral-500 text-start'>{meal.title}</div>
//         <div className='grid grid-cols-2 gap-20'>
//           <div className='font-semibold'> {meal?.price}</div>
//           <div className='font-light'>
//           <div className='flex gap-1'>
//           <svg
//             className=" w-5 h-5 text-gray-700 fill-current dark:text-gray-300"
//             viewBox="0 0 24 24"
//           >
//             <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
//           </svg>
//             <p className='-mb-2'>{meal.rating}</p>
//           </div>
//             </div>
//         </div>
//       </div>
//     </Link>
//   )
// }

// Card.propTypes = {
//   room: PropTypes.object,
// }

// export default Card


import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Card = ({ meal }) => {
  return (
    <Link to={`/meals/${meal?._id}`} className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col items-center'>
        <div className='aspect-square w-56 relative overflow-hidden rounded-xl'>
          <img
            className='object-cover h-full w-full group-hover:scale-110 transition'
            src={meal?.image}
            alt='meal'
          />
        </div>
        <div className='font-bold py-3 text-neutral-500 text-start'>{meal.title}</div>
        <div className='grid grid-cols-2 gap-20'>
          <div className='font-semibold'>{meal?.price}</div>
          <div className='font-light'>
            <div className='flex gap-1'>
              <svg className='w-5 h-5 text-gray-700 fill-current dark:text-gray-300'>
                <path d='M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z' />
              </svg>
              <p>{meal.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

Card.propTypes = {
  meal: PropTypes.object.isRequired,
}

export default Card
