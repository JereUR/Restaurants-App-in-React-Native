import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Icon, Input } from "react-native-elements";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.form}>
      <Input containerStyle={styles.input} placeholder="Enter your email..." />
      <Input
        containerStyle={styles.input}
        placeholder="Enter your password..."
        passwordRules={true}
        secureTextEntry={!showPassword}
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
      />
    </View>
  );
}

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
