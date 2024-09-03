// import { initializeApp } from 'firebase/app'

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
// }

// export const app = initializeApp(firebaseConfig)


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtDEbnCsJSZk1cHRwkalTuHKRk4Vn0C0M",
  authDomain: "hostel-management-system-ef2f8.firebaseapp.com",
  projectId: "hostel-management-system-ef2f8",
  storageBucket: "hostel-management-system-ef2f8.appspot.com",
  messagingSenderId: "337737956557",
  appId: "1:337737956557:web:cef937c3df6f3f49bf7d84"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);