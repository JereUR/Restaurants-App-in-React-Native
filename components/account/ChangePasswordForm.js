import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Icon, Input } from "react-native-elements";
import { isEmpty, size } from "lodash";

import { reauthenticate, updatePasswordUser } from "../../utils/actions";

export default function ChangePasswordForm({ setShowModal, toastRef }) {
  const [newPassword, setNewPassword] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errorNewPassword, setErrorNewPassword] = useState(null);
  const [errorCurrentPassword, setErrorCurrentPassword] = useState(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const resultReauthenticate = await reauthenticate(currentPassword);

    if (!resultReauthenticate.statusResponse) {
      setLoading(false);
      setErrorCurrentPassword("Wrong Password.");
      return;
    }

    const result = await updatePasswordUser(newPassword);

    setLoading(false);

    if (!result.statusResponse) {
      setLoading(false);
      setErrorNewPassword("Error updating password, try later.");
      return;
    }

    toastRef.current.show("Password changed.", 3000);

    setShowModal(false);
  };

  const validateForm = () => {
    setErrorNewPassword(null);
    setErrorCurrentPassword(null);
    setErrorConfirmPassword(null);
    let isValid = true;

    if (isEmpty(currentPassword)) {
      setErrorCurrentPassword("You must enter your current password.");
      isValid = false;
    }

    if (size(newPassword) < 6) {
      setErrorNewPassword(
        "You must enter a new password of at least 6 characters."
      );
      isValid = false;
    }

    if (size(confirmPassword) < 6) {
      setErrorNewPassword(
        "You must enter a confirm password of at least 6 characters."
      );
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      setErrorConfirmPassword("Password and confirmation are not the same.");
      setErrorNewPassword("Password and confirmation are not the same.");
      isValid = false;
    }

    if (newPassword === currentPassword) {
      setErrorNewPassword(
        "You must enter a different password than the current one."
      );
      setErrorCurrentPassword(
        "You must enter a different password than the current one."
      );
      setErrorConfirmPassword(
        "You must enter a different password than the current one."
      );
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Enter your Current Password..."
        containerStyle={styles.input}
        defaultValue={currentPassword}
        onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
        errorMessage={errorCurrentPassword}
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
      <Input
        placeholder="Enter your New Password..."
        containerStyle={styles.input}
        defaultValue={newPassword}
        onChange={(e) => setNewPassword(e.nativeEvent.text)}
        errorMessage={errorNewPassword}
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
      <Input
        placeholder="Enter your Confirmation Password..."
        containerStyle={styles.input}
        defaultValue={confirmPassword}
        onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
        errorMessage={errorConfirmPassword}
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
        title="Change Password"
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
