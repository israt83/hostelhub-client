import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Card = ({ meal }) => {
  return (
    <Link to={`/meal/${meal?._id}`} className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col  w-full'>
        <div
          className='
              aspect-square 
              w-56
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src={meal?.image}
            alt='meal'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        {/* <div className='font-semibold text-lg'>{meal?.location}</div> */}
        <div className='font-light text-neutral-500'>{meal.title}</div>
        <div className='flex flex-row items-center gap-5'>
          <div className='font-semibold'> {meal?.price}</div>
          <div className='font-light'>{meal.rating}</div>
        </div>
      </div>
    </Link>
  )
}

Card.propTypes = {
  room: PropTypes.object,
}

export default Card
