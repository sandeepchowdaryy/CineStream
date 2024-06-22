// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyARLnNLsW0OinKKk06EM_R1TCk0emGwZS0",
  authDomain: "cine-stream-m.firebaseapp.com",
  projectId: "cine-stream-m",
  storageBucket: "cine-stream-m.appspot.com",
  messagingSenderId: "429716393653",
  appId: "1:429716393653:web:4c9077d0c7f36cfa0a38fc",
  measurementId: "G-MR6L1R4WC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export  const auth = getAuth();