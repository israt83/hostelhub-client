


import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

import ServeMealRow from '../../../components/Dashboard/TableRows/ServeMealRow';

const ManageServeMeal = () => {
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure(); 


const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['my-request', user?.email],
    queryFn: async () => {
      console.log("Fetching requests for email:", user?.email); 
      const { data } = await axiosSecure.get(`/manage-serve-meal/${user?.email}`);
      console.log('Fetched requests:', data); 
      return data;
    },
    enabled: !!user?.email,
  });
  
  console.log(requests);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Manage Serve Meal</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
              <thead>
                  <tr>
                    <th className='px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold'>
                     image
                    </th>
                    <th className='px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold'>
                    Title
                    </th>
                    <th className='px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold'>
                    user email
                    </th>
                    <th className='px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold'>
                    
                    Likes
                    </th>
                    <th className='px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold'>
                    status
                    </th>
                    <th className='px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <ServeMealRow
                      key={request._id}
                      request={request}
                      refetch={refetch} 
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageServeMeal;
