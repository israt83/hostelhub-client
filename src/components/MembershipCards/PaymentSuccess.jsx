// import { useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
  
//   useEffect(() => {
//     const sessionId = searchParams.get('session_id');

//     const savePaymentData = async () => {
//       try {
//         if (sessionId) {
//           // Make a request to the backend to handle the session completion and save the payment data
//           const response = await axios.get(`http://localhost:8000/complete?session_id=${sessionId}`);
//           console.log('Payment data saved:', response.data);
//         }
//       } catch (error) {
//         console.error('Error saving payment data:', error);
//       }
//     };

//     savePaymentData();
//   }, [searchParams]);

//   return (
//     <div>
//       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG3WWuzWoVxRNRP_KPm4NOqla9pdFKs3y5Gg&s" alt="" />
//       <h1>Payment Successful</h1>
//       <p>Thank you for your payment!</p>
//     </div>
//   );
// };

// export default PaymentSuccess;


import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    const savePaymentData = async () => {
      try {
        if (sessionId) {
          // Make a request to the backend to handle the session completion and save the payment data
          const response = await axios.get(`http://localhost:8000/complete?session_id=${sessionId}`);
          console.log('Payment data saved:', response.data);
        }
      } catch (error) {
        console.error('Error saving payment data:', error);
      }
    };

    savePaymentData();
  }, [searchParams]);

  const containerStyle = {
    backgroundImage: 'url("https://t4.ftcdn.net/jpg/03/94/41/99/240_F_394419941_bxoSprsknezotBSAY73RNpnWe37F0k9S.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    textAlign: 'center',
    padding: '0 20px',
  };

  return (
    <div style={containerStyle}>
      <h1 className='text-6xl font-semibold uppercase text-orange-600'>congratulations!!!</h1>
      <h1 className='text-2xl text-slate-900 my-1'>Payment Successful</h1>
      <p>Thank you for your payment....</p>
    </div>
  );
};

export default PaymentSuccess;
