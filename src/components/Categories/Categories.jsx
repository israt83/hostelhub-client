import Container from '../Shared/Container'
import CategoryBox from './CategoryBox'
import { categories } from './CategoriesData.js'
import { Fade } from 'react-awesome-reveal'
const Categories = () => {
  return (
    <Fade direction="up"
              delay={50}
              cascade={false}
              triggerOnce={false}>
      <Container>
      <h1 className='text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl pt-8'>
        Explore Meals by Category
        </h1>
        <p className='max-w-2xl mx-auto mb-4 mt-2 text-center text-orange-600 '>
        Browse meals by category to find your favorite Breakfast, Lunch, Dinner, or view All Meals.
        </p>
      <div className='pt-4 flex items-center justify-center space-x-9 overflow-x-auto '>
        {categories.map(item => (
          <CategoryBox key={item.label} label={item.label} icon={item.icon} />
        ))}

      </div>
    </Container>
    </Fade>
  )
}

export default Categories
