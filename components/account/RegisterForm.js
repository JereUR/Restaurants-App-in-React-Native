import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Icon, Input } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

import { validateEmail } from "../../utils/helpers";
import { registerUser } from "../../utils/actions";
import Loading from "../Loading";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const doRegisterUser = async () => {
    if (!validateData()) {
      return;
    }

    setLoading(true);

    const result = await registerUser(formData.email, formData.password);

    setLoading(false);

    if (!result.statusResponse) {
      setErrorEmail(result.error);
      return;
    }

    navigation.navigate("account-stack");
  };

  const validateData = () => {
    setErrorConfirm("");
    setErrorEmail("");
    setErrorPassword("");

    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("You must enter a valid email.");
      isValid = false;
    }

    if (size(formData.password) < 6) {
      setErrorPassword("You must enter a password of at least 6 characters.");
      isValid = false;
    }

    if (size(formData.confirm) < 6) {
      setErrorConfirm(
        "You must enter a confirmation password of at least 6 characters."
      );
      isValid = false;
    }

    if (formData.password !== formData.confirm) {
      setErrorPassword("Password and confirmation are not the same.");
      setErrorConfirm("Password and confirmation are not the same.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.form}>
      <Input
        containerStyle={styles.input}
        placeholder="Enter your email..."
        onChange={(e) => onChange(e, "email")}
        keyboardType="email-address"
        errorMessage={errorEmail}
        defaultValue={formData.email}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Enter your password..."
        passwordRules={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errorPassword}
        defaultValue={formData.password}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        containerStyle={styles.input}
        placeholder="Confirm your password..."
        passwordRules={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "confirm")}
        errorMessage={errorConfirm}
        defaultValue={formData.confirm}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Sign Up"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => doRegisterUser()}
      />
      <Loading isVisible={loading} text="Creating account..." />
    </View>
  );
}

const defaultFormValues = () => {
  return { email: "", password: "", confirm: "" };
};

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
  },

  input: {
    width: "100%",
  },

  btnContainer: {
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
  },

  btn: {
    backgroundColor: "#442484",
  },

  icon: {
    color: "#c1c1c1",
  },
});
