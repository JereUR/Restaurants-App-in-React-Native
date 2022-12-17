import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";

export default function InfoUser({ user }) {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="large"
        source={
          user.photoURL
            ? { uri: user.photoURL }
            : require("../../assets/avatar-default.jpg")
        }
      />
      <View style={styles.infoUser}>
        <Text style={styles.displayName}>
          {user.displayName ? user.displayName : "Anonymous"}
        </Text>
        <Text>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    paddingVertical: 30,
  },

  infoUser: {
    marginLeft: 20,
  },

  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
