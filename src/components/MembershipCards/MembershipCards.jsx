// import { useState, useEffect } from "react";
// import axios from "axios";
// import useAuth from "../../hooks/useAuth";
// import { useLocation, useNavigate } from "react-router-dom"; // For navigation and getting query params

// const MembershipCards = () => {
//   const packages = [
//     {
//       name: "Silver",
//       price: 100,
//       description: "Basic membership with essential features.",
//       badge:
//         "https://st3.depositphotos.com/13821126/18366/v/450/depositphotos_183669194-stock-illustration-silver-round-award-badge-on.jpg",
//     },
//     {
//       name: "Gold",
//       price: 200,
//       description: "Premium membership with additional features.",
//       badge:
//         "https://media.istockphoto.com/id/1064189448/vector/vector-golden-seal-with-ribbons-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=ZLTDY-Xfpb18lg7-Q-tLDM70R0VDr_xr35BImFS19QQ=",
//     },
//     {
//       name: "Platinum",
//       price: 250,
//       description: "Ultimate membership with all features included.",
//       badge:
//         "https://www.shutterstock.com/image-vector/vip-platinum-membership-badge-premium-260nw-1731306640.jpg",
//     },
//   ];

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [subscribedPackages, setSubscribedPackages] = useState([]); // Track subscribed packages

//   const { user } = useAuth(); // Get user details
//   const location = useLocation(); // For detecting URL query params
//   const navigate = useNavigate(); // To navigate after handling

//   // Check if the user completed payment by looking for session_id in query params
//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const sessionId = searchParams.get("session_id");

//     if (sessionId) {
//       // Fetch payment details
//       fetchPaymentDetails(sessionId);
//     }
//   }, [location]);

//   // Fetch payment details from the backend using session_id
//   const fetchPaymentDetails = async (sessionId) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:8000/complete?session_id=${sessionId}`
//       );
//       if (data.package_name) {
//         // Add the subscribed package to state
//         setSubscribedPackages([...subscribedPackages, data.package_name]);
//         // Clear the query params from the URL after processing
//         navigate("/membership", { replace: true });
//       }
//     } catch (error) {
//       console.error("Error fetching payment details:", error);
//     }
//   };

//   // Handle the user clicking the "Upgrade" button
//   const handleUpgrade = async (pkg) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const { data } = await axios.post(
//         "http://localhost:8000/create-checkout-session",
//         {
//           package_name: pkg.name,
//           price: pkg.price,
//           badge_img: pkg.badge,
//           email: user?.email, // Pass the logged-in user's email
//         }
//       );
//       window.location.href = data.url; // Redirect to Stripe Checkout
//     } catch (err) {
//       console.error("Error redirecting to Stripe Checkout:", err);
//       setError(err);
//       setLoading(false);
//     }
//   };

//   // Fetch the user's subscribed packages when the component mounts
//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       if (user?.email) {
//         try {
//           const response = await axios.get(
//             `http://localhost:8000/user-subscriptions?email=${user.email}`
//           );
//           setSubscribedPackages(response.data.subscribedPackages); // Set the subscribed packages in state
//         } catch (error) {
//           console.error("Error fetching subscriptions:", error);
//         }
//       }
//     };

//     fetchSubscriptions();
//   }, [user]);

//   return (
//     <div className="mt-16 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
//       <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
//         Upgrade Your Membership
//       </h1>
//       <p className="text-center py-6 text-gray-500">
//         Unlock exclusive benefits by upgrading to a premium package! <br />
//         Choose from our Silver, Gold, or Platinum membership plans, each
//         offering unique perks at affordable prices.
//       </p>
//       <div className="flex flex-col md:flex-row gap-4 p-4">
//         {packages.map((pkg) => (
//           <div
//             key={pkg.name}
//             className="w-full md:w-1/3 border bg-white shadow-lg rounded-lg p-4 text-center cursor-pointer transition-transform transform hover:scale-105"
//           >
//             <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
//             <p className="text-gray-700 mb-2">{pkg.description}</p>
//             <p className="text-2xl font-semibold mb-4">${pkg.price}</p>
//             {/* <button
//             onClick={() => handleUpgrade(pkg)}
//               className={`inline-block px-6 py-2 text-white rounded-lg ${
//                 subscribedPackages.length > 0
//                   ? "bg-green-500 cursor-not-allowed"
//                   : "bg-[#FF3811]"
//               }`}
//               disabled={subscribedPackages.length > 0} // Disable button if the user is already subscribed to a package
//             >
//               {subscribedPackages.length > 0
//                 ? "Already Subscribed"
//                 : "Subscribe"}
//             </button> */}

//             <button
//                 onClick={() => handleUpgrade(pkg)}
//               className={`inline-block px-6 py-2 text-white rounded-lg ${
//                 subscribedPackages.includes(pkg.name)
//                   ? "bg-green-500 cursor-default" // Subscribed: green button
//                   : "bg-[#FF3811]" // Not subscribed: red button
//               }`}
//               disabled={subscribedPackages.includes(pkg.name)} // Disable the button if subscribed
//             >
//               {subscribedPackages.includes(pkg.name) ? "Subscribed" : "Upgrade"}
//             </button>
//           </div>
//         ))}
//       </div>
//       {loading && <p>Redirecting to Stripe Checkout...</p>}
//       {error && <p>Error redirecting to Stripe Checkout: {error.message}</p>}
//     </div>
//   );
// };

// export default MembershipCards;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import useAuth from "../../hooks/useAuth";
// import { useLocation, useNavigate } from "react-router-dom"; // For navigation and getting query params
// import toast from "react-hot-toast";

// const MembershipCards = () => {
//   const packages = [
//     {
//       name: "Silver",
//       price: 100,
//       description: "Basic membership with essential features.",
//       badge:
//         "https://st3.depositphotos.com/13821126/18366/v/450/depositphotos_183669194-stock-illustration-silver-round-award-badge-on.jpg",
//     },
//     {
//       name: "Gold",
//       price: 200,
//       description: "Premium membership with additional features.",
//       badge:
//         "https://media.istockphoto.com/id/1064189448/vector/vector-golden-seal-with-ribbons-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=ZLTDY-Xfpb18lg7-Q-tLDM70R0VDr_xr35BImFS19QQ=",
//     },
//     {
//       name: "Platinum",
//       price: 250,
//       description: "Ultimate membership with all features included.",
//       badge:
//         "https://www.shutterstock.com/image-vector/vip-platinum-membership-badge-premium-260nw-1731306640.jpg",
//     },
//   ];

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [subscribedPackages, setSubscribedPackages] = useState([]); // Track subscribed packages

//   const { user } = useAuth(); // Get user details
//   const location = useLocation(); // For detecting URL query params
//   const navigate = useNavigate(); // To navigate after handling

//   // Check if the user completed payment by looking for session_id in query params
//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const sessionId = searchParams.get("session_id");

//     if (sessionId) {
//       // Fetch payment details
//       fetchPaymentDetails(sessionId);
//     }
//   }, [location]);

//   // Fetch payment details from the backend using session_id
//   const fetchPaymentDetails = async (sessionId) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:8000/complete?session_id=${sessionId}`
//       );
//       if (data.package_name) {
//         // Add the subscribed package to state
//         setSubscribedPackages([...subscribedPackages, data.package_name ]);
//         // Clear the query params from the URL after processing
//         navigate("/membership", { replace: true });
//       }
//     } catch (error) {
//       console.error("Error fetching payment details:", error);
//     }
//   };

//   // Handle the user clicking the "Upgrade" button
//   const handleUpgrade = async (pkg) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const { data } = await axios.post(
//         "http://localhost:8000/create-checkout-session",
//         {
//           package_name: pkg.name,
//           price: pkg.price,
//           badge_img: pkg.badge,
//           email: user?.email, // Pass the logged-in user's email
//         }
//       );
//       window.location.href = data.url; // Redirect to Stripe Checkout
//     } catch (err) {
//       console.error("Error redirecting to Stripe Checkout:", err);

//       // Check if the error message indicates a subscription issue
//       if (err.response && err.response.data.error) {
//         toast.error(err.response.data.error); // Show alert message from the backend
//       } else {
//         setError(err); // Set error state for unexpected errors
//       }
//       setLoading(false);
//     }
//   };

//   // Fetch the user's subscribed packages when the component mounts
//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       if (user?.email) {
//         try {
//           const response = await axios.get(
//             `http://localhost:8000/user-subscriptions?email=${user.email}`
//           );
//           setSubscribedPackages(response.data.subscribedPackages); // Set the subscribed packages in state
//         } catch (error) {
//           console.error("Error fetching subscriptions:", error);
//         }
//       }
//     };

//     fetchSubscriptions();
//   }, [user]);

//   return (
//     <div className="mt-16 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
//       <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
//         Upgrade Your Membership
//       </h1>
//       <p className="text-center py-6 text-gray-500">
//         Unlock exclusive benefits by upgrading to a premium package! <br />
//         Choose from our Silver, Gold, or Platinum membership plans, each
//         offering unique perks at affordable prices.
//       </p>
//       <div className="flex flex-col md:flex-row gap-4 p-4">
//         {packages.map((pkg) => (
//           <div
//             key={pkg.name}
//             className="w-full md:w-1/3 border bg-white shadow-lg rounded-lg p-4 text-center cursor-pointer transition-transform transform hover:scale-105"
//           >
//             <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
//             <p className="text-gray-700 mb-2">{pkg.description}</p>
//             <p className="text-2xl font-semibold mb-4">${pkg.price}</p>

//             <button
//               onClick={() => handleUpgrade(pkg)}
//               className={`inline-block px-6 py-2 text-white rounded-lg ${
//                 subscribedPackages.includes(pkg.name)
//                   ? "bg-green-500 cursor-default" // Subscribed: green button
//                   : "bg-[#FF3811]" // Not subscribed: red button
//               }`}
//               disabled={subscribedPackages.includes(pkg.name)} // Disable the button if subscribed
//             >
//               {subscribedPackages.includes(pkg.name) ? "Subscribed" : "Upgrade"}
//             </button>
//           </div>
//         ))}
//       </div>
//       {loading && <p>Redirecting to Stripe Checkout...</p>}
//       {error && <p>Error redirecting to Stripe Checkout: {error.message}</p>}
//     </div>
//   );
// };

// export default MembershipCards;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import useAuth from "../../hooks/useAuth";
// import { useLocation, useNavigate } from "react-router-dom"; // For navigation and getting query params
// import toast from "react-hot-toast";

// const MembershipCards = () => {
//   const packages = [
//     {
//       name: "Silver",
//       price: 100,
//       description: "Basic membership with essential features.",
//       badge:
//         "https://st3.depositphotos.com/13821126/18366/v/450/depositphotos_183669194-stock-illustration-silver-round-award-badge-on.jpg",
//     },
//     {
//       name: "Gold",
//       price: 200,
//       description: "Premium membership with additional features.",
//       badge:
//         "https://media.istockphoto.com/id/1064189448/vector/vector-golden-seal-with-ribbons-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=ZLTDY-Xfpb18lg7-Q-tLDM70R0VDr_xr35BImFS19QQ=",
//     },
//     {
//       name: "Platinum",
//       price: 250,
//       description: "Ultimate membership with all features included.",
//       badge:
//         "https://www.shutterstock.com/image-vector/vip-platinum-membership-badge-premium-260nw-1731306640.jpg",
//     },
//   ];

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [subscribedPackages, setSubscribedPackages] = useState([]); // Track subscribed packages

//   const { user } = useAuth(); // Get user details
//   const location = useLocation(); // For detecting URL query params
//   const navigate = useNavigate(); // To navigate after handling

//   // Check if the user completed payment by looking for session_id in query params
//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const sessionId = searchParams.get("session_id");

//     if (sessionId) {
//       // Fetch payment details
//       fetchPaymentDetails(sessionId);
//     }
//   }, [location]);

//   // Fetch payment details from the backend using session_id
//   const fetchPaymentDetails = async (sessionId) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:8000/complete?session_id=${sessionId}`
//       );
//       if (data.package_name) {
//         // Add the subscribed package to state
//         setSubscribedPackages((prev) => [...prev, data.package_name]); // Update subscribed packages
//         // Clear the query params from the URL after processing
//         navigate("/membership", { replace: true });
//       }
//     } catch (error) {
//       console.error("Error fetching payment details:", error);
//     }
//   };


//   // Handle the user clicking the "Upgrade" button
//   const handleUpgrade = async (pkg) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const { data } = await axios.post(
//         "http://localhost:8000/create-checkout-session",
//         {
//           package_name: pkg.name,
//           price: pkg.price,
//           badge_img: pkg.badge,
//           email: user?.email, // Pass the logged-in user's email
//         }
//       );
//       window.location.href = data.url; // Redirect to Stripe Checkout
//     } catch (err) {
//       console.error("Error redirecting to Stripe Checkout:", err);

//       // Check if the error message indicates a subscription issue
//       if (err.response && err.response.data.error) {
//         toast.error(err.response.data.error); // Show alert message from the backend
//       } else {
//         setError(err); // Set error state for unexpected errors
//       }
//       setLoading(false);
//     }
//   };

//   // Fetch the user's subscribed packages when the component mounts
//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       if (user?.email) {
//         try {
//           const response = await axios.get(
//             `http://localhost:8000/user-subscriptions?email=${user.email}`
//           );
//           setSubscribedPackages(response.data.subscribedPackages); // Set the subscribed packages in state
//         } catch (error) {
//           console.error("Error fetching subscriptions:", error);
//         }
//       }
//     };

//     fetchSubscriptions();
//   }, [user]);



//   return (
//     <div className="mt-16 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
//       <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
//         Upgrade Your Membership
//       </h1>
//       <p className="text-center py-6 text-gray-500">
//         Unlock exclusive benefits by upgrading to a premium package! <br />
//         Choose from our Silver, Gold, or Platinum membership plans, each
//         offering unique perks at affordable prices.
//       </p>
//       <div className="flex flex-col md:flex-row gap-4 p-4">
//         {packages.map((pkg) => (
//           <div
//             key={pkg.name}
//             className="w-full md:w-1/3 border bg-white shadow-lg rounded-lg p-4 text-center cursor-pointer transition-transform transform hover:scale-105"
//           >
//             <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
//             <p className="text-gray-700 mb-2">{pkg.description}</p>
//             <p className="text-2xl font-semibold mb-4">${pkg.price}</p>
//             {/* 
//             <button
//               onClick={() => handleUpgrade(pkg)}
//               className={`inline-block px-6 py-2 text-white rounded-lg ${
//                 subscribedPackages.includes(pkg.name)
//                   ? "bg-green-500 cursor-default" // Subscribed: green button
//                   : "bg-[#FF3811]" // Not subscribed: red button
//               }`}
//               disabled={subscribedPackages.includes(pkg.name)} // Disable the button if subscribed
//             >
//               {subscribedPackages.includes(pkg.name) ? "Subscribed" : "Upgrade"}
//             </button> */}

//             <button
//               onClick={() => handleUpgrade(pkg)}
//               className={`inline-block px-6 py-2 text-white rounded-lg ${
//                 subscribedPackages.includes(pkg.name)
//                   ? "bg-green-500 cursor-default" // Subscribed: green button
//                   : "bg-[#FF3811]" // Not subscribed: red button
//               }`}
//               disabled={subscribedPackages.includes(pkg.name)} // Disable the button if subscribed
//             >
//               {subscribedPackages.includes(pkg.name) ? "Subscribed" : "Upgrade"}
//             </button>
//           </div>
//         ))}
//       </div>
//       {loading && <p>Redirecting to Stripe Checkout...</p>}
//       {error && <p>Error redirecting to Stripe Checkout: {error.message}</p>}
//     </div>
//   );
// };

// export default MembershipCards;



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

  // Check if payment was successful by looking for session_id in URL query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      fetchPaymentDetails(sessionId);
    }
  }, [location]);

  // Fetch payment details using session_id
  const fetchPaymentDetails = async (sessionId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/complete?session_id=${sessionId}`
      );
      if (data.package_name) {
        setSubscribedPackages((prev) => [...prev, data.package_name]);
        navigate("/membership", { replace: true }); // Clear URL params
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  // Handle the user clicking the "Upgrade" button
  const handleUpgrade = async (pkg) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/create-checkout-session",
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

  // Fetch user's subscribed packages on component mount
  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (user?.email) {
        try {
          const response = await axios.get(
            `http://localhost:8000/user-subscriptions?email=${user.email}`
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
