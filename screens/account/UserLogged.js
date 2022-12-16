import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { closeSession } from "../../utils/actions";

export default function UserLogged() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>UserLogged...</Text>
      <Button
        title="Sign out"
        onPress={() => {
          closeSession();
          navigation.navigate("restaurants");
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
