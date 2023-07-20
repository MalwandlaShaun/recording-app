import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyAbwwLQlxeIwlxIVgser2l_uK7T763d35w",
  authDomain: "recording-app-1f274.firebaseapp.com",
  projectId: "recording-app-1f274",
  storageBucket: "recording-app-1f274.appspot.com",
  messagingSenderId: "606641526120",
  appId: "1:606641526120:web:43d0a0a949508d731972dd",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export default FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
