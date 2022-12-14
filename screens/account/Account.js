import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import "firebase/firestore";

import UserLogged from "./UserLogged";
import UserGuest from "./UserGuest";
import { getCurrentUser, isUserLogged } from "../../utils/actions";
import Loading from "../../components/Loading";

export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    setLogin(isUserLogged());
  }, []);

  if (login == null) {
    return <Loading isVisible={true} text="Loading..."></Loading>;
  }

  return login ? <UserLogged /> : <UserGuest />;
}

const styles = StyleSheet.create({});
