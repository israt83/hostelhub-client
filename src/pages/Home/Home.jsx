import { Helmet } from 'react-helmet-async'

import Carousel from '../../components/Banner/Carousel'
import TabCategories from '../../components/TabCategorise/TabCategories'
import Meals from '../../components/Home/Meals'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>StayVista | Vacation Homes & Condo Rentals</title>
      </Helmet>
      <Carousel></Carousel>
      {/* Categories section  */}
      <TabCategories></TabCategories>
      {/* Meals section */}
      <Meals></Meals>
    </div>
  )
}

export default Home
