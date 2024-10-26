


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
      badge:
        "https://i.ibb.co.com/sKKgJvG/In-Shot-20241024-202255053.png",
    },
    {
      name: "Gold",
      price: 200,
      description: "Premium membership with additional features.",
      badge:
        "https://i.ibb.co.com/pxC9krj/In-Shot-20241024-202205050.png",
    },
    {
      name: "Platinum",
      price: 250,
      description: "Ultimate membership with all features included.",
      badge:
        "https://i.ibb.co.com/vzTjrCh/In-Shot-20241024-202021751.pnghttps://i.ibb.co.com/vzTjrCh/In-Shot-20241024-202021751.png",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
    setLoading(true);
    setError(null);

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
        setError(err);
      }
      setLoading(false);
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
    <div className="mt-16 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
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
            <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
            <p className="text-gray-700 mb-2">{pkg.description}</p>
            <p className="text-2xl font-semibold mb-4">${pkg.price}/month</p>
            <button
              onClick={() => handleUpgrade(pkg)}
              className={`inline-block px-6 py-2 text-white rounded-lg ${
                subscribedPackages.includes(pkg.name)
                  ? "bg-green-500 cursor-default"
                  : "bg-[#FF3811]"
              }`}
              disabled={subscribedPackages.includes(pkg.name)}
            >
              {subscribedPackages.includes(pkg.name) ? "Subscribed" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>
      {loading && <p>Redirecting to Stripe Checkout...</p>}
      {error && <p>Error redirecting to Stripe Checkout: {error.message}</p>}
    </div>
  );
};

export default MembershipCards;
