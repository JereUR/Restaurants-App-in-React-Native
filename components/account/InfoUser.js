import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-elements";

import { loadImageFromGallery } from "../../utils/helpers";
import { updateProfile, uploadImage } from "../../utils/actions";
import { Alert } from "react-native";

export default function InfoUser({ user, setLoading, setLoadingText }) {
  const [photoUrl, setPhotoUrl] = useState(user.photoURL);

  /* const changePhoto = async () => {
    const result = await loadImageFromGallery([1, 1]);

    if (!result.status) {
      return;
    }

    setLoadingText("Updating image...");
    setLoading(true);

    const resultUploadImage = await uploadImage(
      result.image,
      "avatars",
      user.uid
    );

    console.log(resultUploadImage);

    if (!resultUploadImage.statusResponse) {
      setLoading(false);
      Alert.alert("An error occurred while storing the profile photo.");
      return;
    }

    const resultUpdateProfile = await updateProfile({
      photoURL: resultUploadImage.url,
    });

    setLoading(false);

    if (resultUpdateProfile.statusResponse) {
      setPhotoUrl(resultUploadImage.url);
    } else {
      Alert.alert("An error occurred while updating the profile photo");
    }
  }; */

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="large"
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
});
