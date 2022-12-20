import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { isEmpty } from "lodash";
import { getAuth, updateProfile } from "firebase/auth";

import { app } from "../../utils/firebase";

export default function ChangeDisplayNameForm({
  displayName,
  setShowModal,
  toastRef,
  setReloadUser,
}) {
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const result = await updateProfile(getAuth(app).currentUser, {
      displayName: newDisplayName,
    });

    setLoading(false);

    if (result != undefined) {
      setError("Error updating name/s and last name/s, try later.");
      return;
    }

    setReloadUser(true);

    toastRef.current.show("Name/s and Lastname/s changed.", 3000);

    setShowModal(false);
  };

  const validateForm = () => {
    setError(null);

    if (isEmpty(newDisplayName)) {
      setError("You must enter name/s and lastname/s");
      return false;
    }

    if (newDisplayName === displayName) {
      setError(
        "You must enter name/s and lastname/s differents from the current one"
      );
      return false;
    }

    return true;
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Enter Name/s and Lastname/s"
        containerStyle={styles.input}
        defaultValue={displayName}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        errorMessage={error}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
      />
      <Button
        title="Change Name/s and Lastname/s"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingVertical: 10,
  },

  input: {
    marginBottom: 10,
  },

  btnContainer: {
    width: "95%",
  },

  btn: {
    backgroundColor: "#442484",
  },
});
