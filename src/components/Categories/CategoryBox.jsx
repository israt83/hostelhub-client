

// import PropTypes from 'prop-types'
import queryString from 'query-string'
import { useNavigate, useSearchParams } from 'react-router-dom'

const CategoryBox = ({ label }) => {
    // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams()
  const category = params.get('category')

  const navigate = useNavigate()
  const handleClick = () => {
    // 1. Create Query String
    let currentQuery = { category: label }
    const url = queryString.stringifyUrl({
      url: '/',
      query: currentQuery,
    })
    // url output---> /?category=label

    // 2. Set query string in url
    navigate(url)
  }

      
  return (
    <div
      onClick={handleClick}
      className={`flex 
    flex-col 
    items-center 
    justify-center 
   
    border-b-2
   hover:text-neutral-800
    transition
    cursor-pointer  ${
      category === label && 'border-b-orange-600 text-neutral-800'
    } `}
    >
      
      <div className='text-lg font-medium'>{label}</div>
    </div>
  );
};

// CategoryBox.propTypes = {
//   label: PropTypes.string,
 
// }
export default CategoryBox;
