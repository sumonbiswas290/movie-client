// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrzLzuucGLTo1Io1hM9CyHBPAxygrSuB4",
  authDomain: "movie-portal-8fd7d.firebaseapp.com",
  projectId: "movie-portal-8fd7d",
  storageBucket: "movie-portal-8fd7d.firebasestorage.app",
  messagingSenderId: "746961678869",
  appId: "1:746961678869:web:c4fff74735c2de14c3d41c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;