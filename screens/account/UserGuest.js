import { StyleSheet, Text, ScrollView, Image } from "react-native";
import React from "react";
import { Button } from "react-native-elements";

export default function UserGuest() {
  return (
    <ScrollView centerContent style={styles.viewBody}>
      <Image
        source={require("../../assets/restaurant-logo.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <Text style={styles.title}>Check your profile in Restaurants</Text>
      <Text style={styles.description}>
        How would you describe your best restaurant? Search and view the best
        restaurants in a simple way, vote which one you liked the most and
        comment on your experience.
      </Text>
      <Button
        title="View your profile"
        buttonStyle={styles.button}
        onPress={() => console.log("Click!!")}
      ></Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginHorizontal: 30,
  },

  image: {
    height: 300,
    width: "100%",
    marginBottom: 10,
    textAlign: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginVertical: 10,
    textAlign: "center",
  },

  description: {
    textAlign: "justify",
    marginBottom: 20,
    color: "#a65273",
  },

  button: {
    backgroundColor: "#442484",
  },
});
