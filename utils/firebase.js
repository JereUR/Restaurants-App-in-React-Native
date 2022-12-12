import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config"; //Your firebase config

export const app = initializeApp(firebaseConfig);
