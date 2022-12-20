import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-elements";

import { loadImageFromGallery } from "../../utils/helpers";
import { updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../../utils/firebase";

export default function InfoUser({
  user,
  setLoading,
  setLoadingText,
  toastRef,
}) {
  const [photoUrl, setPhotoUrl] = useState(user.photoURL);

  const changePhoto = async () => {
    const result = await loadImageFromGallery([1, 1]);

    if (!result.status) {
      return;
    }

    setLoadingText("Updating image...");
    setLoading(true);

    const resultUploadImage = await updateProfile(getAuth(app).currentUser, {
      photoURL: result.image,
    });

    if (resultUploadImage != undefined) {
      setLoading(false);
      Alert.alert("An error occurred while storing the profile photo.");
      return;
    }

    setPhotoUrl(result.image);

    toastRef.current.show("Profile photo changed.", 3000);

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="large"
        onPress={changePhoto}
        source={
          photoUrl
            ? { uri: photoUrl }
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

  progressBarContainer: {
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "#ffb6b9",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
