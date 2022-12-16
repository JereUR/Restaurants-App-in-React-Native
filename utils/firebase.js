import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config"; //Your firebase config
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

export const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
