import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import "firebase/firestore";
import UserLogged from "./UserLogged";
import UserGuest from "./UserGuest";
import app from "../../utils/firebase";
import { getCurrentUser } from "../../utils/actions";
import Loading from "../../components/Loading";

export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    /* const user = getAuth(app).currentUser; */
    const user = getCurrentUser(app);
    user == null ? setLogin(false) : setLogin(true);
  }, []);

  if (login == null) {
    return <Loading isVisible={true} text="Loading..."></Loading>;
  }

  return login ? <UserLogged /> : <UserGuest />;
}

const styles = StyleSheet.create({});
