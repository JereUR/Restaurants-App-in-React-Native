import "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { app } from "./firebase";

/* const db = firestore(); */

export const isUserLogged = () => {
  let isLogged = false;
  getAuth(app).onAuthStateChanged((user) => {
    user !== null && (isLogged = true);
  });

  return isLogged;
};

export const getCurrentUser = (app) => {
  return getAuth(app).currentUser;
};

export const registerUser = async (email, password) => {
  const result = { statusResponse: true, error: null };

  try {
    await createUserWithEmailAndPassword(getAuth(app), email, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = "This email has already been registered.";
  }

  return result;
};

export const closeSession = () => {
  return getAuth(app).signOut();
};

export const loginWithEmailAndPassword = async (email, password) => {
  const result = { statusResponse: true, error: null };

  try {
    await signInWithEmailAndPassword(getAuth(app), email, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = "Invalid username or password.";
  }

  return result;
};

export const updateProfileInfo = async (data) => {
  const result = { statusResponse: true, error: null };

  try {
    await getAuth(app).currentUser.updateProfile(data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }

  return result;
};

export const reauthenticate = async (password) => {
  const result = { statusResponse: true, error: null };
  const user = getCurrentUser();
  const credentials = EmailAuthProvider.credential(user.email, password);

  try {
    await reauthenticateWithCredential(user, credentials);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }

  return result;
};

export const updateEmailUser = async (email) => {
  const result = { statusResponse: true, error: null };
  try {
    await updateEmail(getCurrentUser(), email);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const updatePasswordUser = async (password) => {
  const result = { statusResponse: true, error: null };
  try {
    await updatePassword(getCurrentUser(), password);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};
