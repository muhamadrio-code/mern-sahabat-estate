import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-954db.firebaseapp.com",
  projectId: "mern-estate-954db",
  storageBucket: "mern-estate-954db.appspot.com",
  messagingSenderId: "1028633944411",
  appId: "1:1028633944411:web:f98be54b1ada212597fa7e"
};

export const firebaseApp = initializeApp(firebaseConfig);