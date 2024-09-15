import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'
import PropTypes from 'prop-types'
const GuestRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'guest') return children
  return <Navigate to='/dashboard/' />
}

export default GuestRoute

GuestRoute.propTypes = {
  children: PropTypes.element,
}