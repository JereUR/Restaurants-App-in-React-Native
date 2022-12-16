import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TopRestaurants from "../screens/TopRestaurants";

const Stack = createStackNavigator();

export default function TopRestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="top-restaurants-stack"
        component={TopRestaurants}
        options={{ title: "Best Restaurants" }}
      />
    </Stack.Navigator>
  );
}
