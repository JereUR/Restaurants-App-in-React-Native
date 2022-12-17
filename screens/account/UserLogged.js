import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

import { closeSession, getCurrentUser } from "../../utils/actions";
import Loading from "../../components/Loading";
import InfoUser from "../../components/account/InfoUser";

export default function UserLogged() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [user, setUser] = useState(null);

  const toastRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <View style={styles.container}>
      {user && <InfoUser user={user} />}
      <Text>Account Options</Text>
      <Button
        buttonStyle={styles.btnCloseSesion}
        titleStyle={styles.btnCloseSesionTitle}
        title="Sign out"
        onPress={() => {
          closeSession();
          navigation.navigate("restaurants");
        }}
      ></Button>
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={loading} text={loadingText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#f9f9f9",
  },

  btnCloseSesion: {
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#442484",
    borderBottomWidth: 1,
    borderBottomColor: "#442484",
    paddingVertical: 10,
  },

  btnCloseSesionTitle: {
    color: "#442484",
  },
});
