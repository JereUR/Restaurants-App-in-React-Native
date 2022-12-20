import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Icon, Input } from "react-native-elements";
import { isEmpty } from "lodash";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";

import { app } from "../../utils/firebase";
import { validateEmail } from "../../utils/helpers";
import {
  getCurrentUser,
  reauthenticate,
  updateEmailUser,
} from "../../utils/actions";

export default function ChangeEmailForm({
  email,
  setShowModal,
  toastRef,
  setReloadUser,
}) {
  const [newEmail, setNewEmail] = useState(email);
  const [password, setPassword] = useState(null);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const resultReauthenticate = await reauthenticate(password);

    if (!resultReauthenticate.statusResponse) {
      setLoading(false);
      setErrorPassword("Wrong Password.");
      return;
    }

    const resultUpdateEmail = await updateEmailUser(newEmail);

    setLoading(false);

    if (!resultUpdateEmail.statusResponse) {
      setErrorEmail(
        "You cannot change this email, it is already in use by another user."
      );
      return;
    }

    setReloadUser(true);

    toastRef.current.show("Email changed.", 3000);

    setShowModal(false);
  };

  const validateForm = () => {
    setErrorEmail(null);
    setErrorPassword(null);
    let isValid = true;

    if (!validateEmail(newEmail)) {
      setErrorEmail("You must enter a valid email.");
      isValid = false;
    }

    if (newEmail === email) {
      setErrorEmail("You must enter a different email than the current one.");
      isValid = false;
    }

    if (isEmpty(password)) {
      setErrorPassword("You must enter your password.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Enter a new Email..."
        containerStyle={styles.input}
        defaultValue={email}
        onChange={(e) => setNewEmail(e.nativeEvent.text)}
        errorMessage={errorEmail}
        keyboardType="email-address"
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
      />
      <Input
        placeholder="Enter your Password..."
        containerStyle={styles.input}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        errorMessage={errorPassword}
        password={true}
        secureTextEntry={!showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={{ color: "#c2c2c2" }}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Change Email"
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
