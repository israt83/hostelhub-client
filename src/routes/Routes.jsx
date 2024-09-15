import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'

import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import Statistics from '../pages/Dashboard/Common/Statistics'


import Profile from '../pages/Dashboard/Common/Profile'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import AdminRoute from './AdminRoute'



import MealDetails from '../pages/MealDetails/MealDetails'
import AddMeal from '../pages/Dashboard/Admin/AddMeal'
import AllMeals from '../components/AllMeals/AllMeals'
import AllMeal from '../pages/Dashboard/Admin/AllMeal'
import CheckoutPage from '../components/MembershipCards/CheckoutPage'
import UpcomingMeals from '../components/UpcomingMeals/UpcomingMeals'
import Reviews from '../pages/MealDetails/Reviews'

import GuestRoute from './GuestRoute'
import MyRequest from '../pages/Dashboard/Guest/MyRequest'
import ManageServeMeal from '../pages/Dashboard/Admin/ManageServeMeal'


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
        path: '/upcoming-meals',
        element: <UpcomingMeals/>,
      },
      {
        path: '/meals/:id/review',
        element: <Reviews/>,
      },
      {
        path: '/checkout/:package_name',
        element: (
          <PrivateRoute>
            <CheckoutPage/>
          </PrivateRoute>
        ),
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
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
    
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
