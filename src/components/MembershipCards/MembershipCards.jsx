import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MembershipCards = () => {
  const packages = [
    {
      name: "Silver",
      price: 100,
      description: "Basic membership with essential features.",
      benefits: [
        "Basic meal plan",
        "Shared study rooms",
        "Access to community events",
      ],
      badge: "https://i.ibb.co.com/sKKgJvG/In-Shot-20241024-202255053.png",
    },
    {
      name: "Gold",
      price: 200,
      description: "Premium membership with additional features.",
      benefits: [
        "Premium meal plan",
        "Private study rooms",
        "Laundry service",
        "Access to community events",
      ],
      badge: "https://i.ibb.co.com/pxC9krj/In-Shot-20241024-202205050.png",
    },
    {
      name: "Platinum",
      price: 250,
      description: "Ultimate membership with all features included.",
      benefits: [
        "Premium meal plan",
        "Private study rooms",
        "Laundry service",
        "Access to community events",
        " 24/7 concierge service",
        "Exclusive access to events",
      ],
      badge:
        "https://i.ibb.co.com/vzTjrCh/In-Shot-20241024-202021751.pnghttps://i.ibb.co.com/vzTjrCh/In-Shot-20241024-202021751.png",
    },
  ];

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [subscribedPackages, setSubscribedPackages] = useState([]);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      fetchPaymentDetails(sessionId);
    }
  }, [location]);

  const fetchPaymentDetails = async (sessionId) => {
    try {
      const { data } = await axios.get(
        `https://hostel-management-system-server-six.vercel.app/complete?session_id=${sessionId}`
      );
      if (data.package_name) {
        setSubscribedPackages((prev) => [...prev, data.package_name]);
        navigate("/membership", { replace: true });
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  const handleUpgrade = async (pkg) => {
    // setLoading(true);
    // setError(null);

    try {
      const { data } = await axios.post(
        "https://hostel-management-system-server-six.vercel.app/create-checkout-session",
        {
          package_name: pkg.name,
          price: pkg.price,
          badge_img: pkg.badge,
          email: user?.email,
        }
      );
      window.location.href = data.url;
    } catch (err) {
      console.error("Error redirecting to Stripe Checkout:", err);

      if (err.response && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        // setError(err);
        toast.error("something is rong");
      }
      // setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (user?.email) {
        try {
          const response = await axios.get(
            `https://hostel-management-system-server-six.vercel.app/user-subscriptions?email=${user.email}`
          );
          setSubscribedPackages(
            response.data.subscribedPackages.map((pkg) => pkg.package_name)
          );
        } catch (error) {
          console.error("Error fetching subscriptions:", error);
        }
      }
    };

    fetchSubscriptions();
  }, [user]);

  return (
    <div className="mt-16 max-w-[2520px]  mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
        Upgrade Your Membership
      </h1>
      <p className="text-center py-6 text-gray-500">
        Unlock exclusive benefits by upgrading to a premium package! <br />
        Choose from our Silver, Gold, or Platinum membership plans, each
        offering unique perks at affordable prices.
      </p>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="w-full md:w-1/3 border bg-white shadow-lg rounded-lg p-4 text-center cursor-pointer transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold mb-1">{pkg.name}</h2>
            <p className="text-2xl font-semibold ">${pkg.price}/month</p>
            <p className="text-gray-700 mb-2">{pkg.description}</p>
            {/* Benefits list */}
            <ul className="text-gray-600 h-36">
              {pkg.benefits.map((benefit, index) => (
                <li key={index} className="">
                  <div className="flex gap-2">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 dark:text-teal-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        ></path>
                      </svg>
                    </div>
                    <div>{benefit}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-2">
          
              <button
                data-aos="zoom-in"
                data-aos-delay="2000"
                data-aos-duration="2000"
                onClick={() => handleUpgrade(pkg)}
                className={`px-6 py-2 
    relative inline-flex items-center justify-start overflow-hidden border font-medium transition-all rounded hover:bg-white group
    ${
      subscribedPackages.includes(pkg.name)
        ? "bg-green-500 border-green-600   text-white cursor-default"
        : "bg-white text-black border-[#FF3811] "
    }`}
                disabled={subscribedPackages.includes(pkg.name)}
              >
              
                <span  className={` ${
                    subscribedPackages.includes(pkg.name)
                      ? ""
                      : "w-48 h-48 rounded rotate-[-40deg] bg-[#FF3811] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"
                  }`} >

                </span>
                <span
                  className={`relative w-full text-left transition-colors duration-300 ease-in-out ${
                    subscribedPackages.includes(pkg.name)
                      ? "text-black"
                      : "group-hover:text-white"
                  }`}
                >
                  {subscribedPackages.includes(pkg.name)
                    ? "Subscribed"
                    : "Upgrade"}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* {loading && <p>Redirecting to Stripe Checkout...</p>}
      {error && <p>Error redirecting to Stripe Checkout: {error.message}</p>} */}
    </div>
  );
};

export default MembershipCards;
