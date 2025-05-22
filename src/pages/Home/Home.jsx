import { Helmet } from 'react-helmet-async'
import Categories from '../../components/Categories/Categories'
import Carousel from '../../components/Banner/Carousel'
// import TabCategories from '../../components/TabCategorise/TabCategories'
import Meals from '../../components/Home/Meals'
import MembershipCards from '../../components/MembershipCards/MembershipCards'
import Contact from '../../components/Contact/Contact'

import Partnership from '../../components/Partnership/Partnership'
import Subscribe from '../../components/Subscribe/Subscribe'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>HostelHub |  Homes </title>
      </Helmet>
      <Carousel></Carousel>
      {/* Categories section  */}
      <Categories />
      {/* <TabCategories></TabCategories> */}
      {/* Meals section */}
      <Meals></Meals>
      <MembershipCards></MembershipCards>
      <Contact></Contact>
      <Partnership></Partnership>
   <Subscribe/>
    
    </div>
  )
}

export default Home
