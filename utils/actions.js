import "firebase/firestore";
import { getAuth } from "firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { app } from "./firebase";

/* const db = firestore(); */

export const isUserLogged = () => {
  let isLogged = false;
  getAuth(app).onAuthStateChanged((user) => {
    user !== null && (isLogged = true);
  });
};

export const getCurrentUser = (app) => {
  return getAuth(app).currentUser;
};
