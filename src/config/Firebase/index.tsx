// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM7OXWpczKeMnTjidVzif_3T_whQhecNc",
  authDomain: "chill-cafe-57aa0.firebaseapp.com",
  projectId: "chill-cafe-57aa0",
  storageBucket: "chill-cafe-57aa0.firebasestorage.app",
  messagingSenderId: "439811577053",
  appId: "1:439811577053:web:86034711f554ace01db734",
  databaseURL:"https://chill-cafe-57aa0-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;