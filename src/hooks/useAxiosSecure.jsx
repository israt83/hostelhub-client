

import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        console.log('Error caught in interceptor:', error);

        if (error.response) {
          // Response errors (e.g., 401, 403)
          console.log('Response error data:', error.response.data);
          console.log('Response error status:', error.response.status);

          if (error.response.status === 401 || error.response.status === 403) {
            await logOut();
            navigate('/login');
          }
        } else if (error.request) {
          // Request errors
          console.log('Request error:', error.request);
        } else {
          // General errors
          console.log('General error message:', error.message);
        }

        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor on unmount
    return () => axiosSecure.interceptors.response.eject(interceptor);
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
