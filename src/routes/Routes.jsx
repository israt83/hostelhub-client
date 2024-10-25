import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'

import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'



import Profile from '../pages/Dashboard/Common/Profile'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import AdminRoute from './AdminRoute'



import MealDetails from '../pages/MealDetails/MealDetails'
import AddMeal from '../pages/Dashboard/Admin/AddMeal'
import AllMeals from '../components/AllMeals/AllMeals'
import AllMeal from '../pages/Dashboard/Admin/AllMeal'

import UpcomingMeals from '../components/UpcomingMeals/UpcomingMeals'

import GuestRoute from './GuestRoute'
import MyRequest from '../pages/Dashboard/Guest/MyRequest'
import ManageServeMeal from '../pages/Dashboard/Admin/ManageServeMeal'
import MyReview from '../pages/Dashboard/Guest/MyReview'
import AllReviews from '../pages/Dashboard/Admin/AllReviews'
import UpcomingMeal from '../pages/Dashboard/Admin/UpcomingMeal'
import PaymentSuccess from '../components/MembershipCards/PaymentSuccess'
import PaymentHistory from '../pages/Dashboard/Guest/PaymentHistory'



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/meals',
        element: <AllMeals />,
      },
      {
        path: '/meals/:id',
        element: (
          <PrivateRoute>
            <MealDetails></MealDetails>
          </PrivateRoute>
        ),
      },
      {
        path: '/complete',
        element: (
          <PrivateRoute>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRoute>
        ),
      },
      {
        path: '/upcoming-meals',
        element: <UpcomingMeals/>,
      },
      {
        path: '/upcoming-meals/:id',
        element: <UpcomingMeals/>,
      },
      
     
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
   
    
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'add-meal',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddMeal />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'all-meal',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllMeal />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'all-reviews',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllReviews/>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'upcoming-meal',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpcomingMeal/>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-request',
        element: (
          <PrivateRoute>
         <GuestRoute>
          <MyRequest></MyRequest>
         </GuestRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-reviews',
        element: (
          <PrivateRoute>
         <GuestRoute>
          <MyReview></MyReview>
         </GuestRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-history',
        element: (
          <PrivateRoute>
         <GuestRoute>
          <PaymentHistory></PaymentHistory>
         </GuestRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-serve-meal',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageServeMeal />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
])
