import axios from 'axios'
import { useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})
const useAxiosSecure = () => {
  const { logOut } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      res => {
        return res;
      },
      async error => {
        // Log the entire error object for debugging
        console.log('Error caught in interceptor:', error);
  
        if (error.response) {
          // Handle response errors (status codes like 401, 403)
          console.log('Response error:', error.response); // Log the response error
          
          if (error.response.status === 401 || error.response.status === 403) {
            await logOut();
            navigate('/login');
          }
        } else if (error.request) {
          // Handle request errors (e.g., no response from server)
          console.log('Request error:', error.request); 
        } else {
          // Handle other types of errors (e.g., network issues)
          console.log('Other error:', error.message); 
        }
  
        return Promise.reject(error); // Still reject the error for further handling
      }
    );
  }, [logOut, navigate]);
  

  return axiosSecure
}

export default useAxiosSecure
// import axios from 'axios'
// import { useEffect } from 'react'
// import useAuth from './useAuth'
// import { useNavigate } from 'react-router-dom'

// export const axiosSecure = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// })
// const useAxiosSecure = () => {
//   const { logOut } = useAuth()
//   const navigate = useNavigate()
//   useEffect(() => {
//     axiosSecure.interceptors.response.use(
//       res => {
//         return res
//       },
//       async error => {
//         console.log('error tracked in the interceptor', error.response)
//         if (error.response.status === 401 || error.response.status === 403) {
//           await logOut()
//           navigate('/login')
//         }
//         return Promise.reject(error)
//       }
//     )
//   }, [logOut, navigate])

//   return axiosSecure
// }

// export default useAxiosSecure



