import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARDbddZMa1K0Xa9NQUwym8_Bc8B-PgTko",
  authDomain: "uon-uon.firebaseapp.com",
  projectId: "uon-uon",
  storageBucket: "uon-uon.appspot.com",
  messagingSenderId: "369695511780",
  appId: "1:369695511780:web:0e30986e4ac571825588f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

const db = getFirestore();
export default db;
export { auth }; 