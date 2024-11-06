

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { FaDollarSign, FaRegCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
// import { GiPlayerTime } from "react-icons/gi";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const PaymentHistory = () => {
  const { user } = useAuth(); 
  const axiosCommon = useAxiosCommon();

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["paymentHistory", user.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/payment-history?email=${user.email}`
      );
      return data;
    },
    enabled: !!user.email, 
  });

  // Fetch meal requests using react-query
  const { data: requests = [] } = useQuery({
    queryKey: ['my-request', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-request/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  // Calculate the total number of meal requests
  const totalMealRequests = requests.length;

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isError || payments.length === 0) {
    return toast.error('You have not payment data .Please  subscribe any package and membership with all features included.');
  }

  return (
    <div className="payment-history container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>

      {payments.map((payment) => (
        <div key={payment._id}>
          <div className="mt-12">
  
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div
                  className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
                >
                  <FaDollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total Spent
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    ${payment.amount}
                  </h4>
                </div>
              </div>

            
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div
                  className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
                >
                  <BsFillCartPlusFill className="w-6 h-6 text-white" />
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total Request Meal
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {totalMealRequests}
                  </h4>
                </div>
              </div>

              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div
                  className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-gray-600 to-gray-400 text-white shadow-gray-500/40`}
                >
                  <FaRegCalendarAlt className="w-6 h-6 text-white" />
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                   Payment Date
                  </p>
                  <p className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900">{new Date(payment.payment_date).toLocaleDateString()}</p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"></h4>
                </div>
              </div>
          
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div
                  className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
                >
                  <FaRegCalendarCheck className="w-6 h-6 text-white" />
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Payment Status
                  </p>
                  <p className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900">{payment.payment_status}</p>
                  
                </div>
              </div>
            </div>
          </div>
      
           
            <h1 className="text-2xl font-bold text-center">{payment.package_name} Package</h1>
           
           <div className="flex flex-row justify-center">
            <p></p>
           <img className="h-44 w  " src={payment.badge_img} alt="" />
           </div>
        
        </div>
      ))}
    </div>
  );
};

export default PaymentHistory;
