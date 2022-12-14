import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Restaurants from "../screens/restaurants/Restaurants";
import AddRestaurant from "../screens/restaurants/AddRestaurant";

const Stack = createStackNavigator();

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants-stack"
        component={Restaurants}
        options={{ title: "Restaurants" }}
      />
      <Stack.Screen
        name="add-restaurant"
        component={AddRestaurant}
        options={{ title: "Create Restaurant" }}
      />
    </Stack.Navigator>
  );
}
