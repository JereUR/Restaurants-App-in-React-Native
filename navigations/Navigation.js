import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Restaurants from "../screens/Restaurants";
import Favorites from "../screens/Favorites";
import TopRestaurants from "../screens/TopRestaurants";
import Search from "../screens/Search";
import Account from "../screens/account/Account";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const screenOptions = (route, color) => {
    let iconName;

    switch (route.name) {
      case "restaurants":
        iconName = "compass-outline";
        break;
      case "favorites":
        iconName = "heart-outline";
        break;
      case "top-restaurants":
        iconName = "star-outline";
        break;
      case "search":
        iconName = "magnify";
        break;
      case "account":
        iconName = "home-outline";
        break;

      default:
        break;
    }

    return (
      <Icon type="material-community" name={iconName} size={22} color={color} />
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurants"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarActiveTintColor: "#442484",
          tabBarInactiveTintColor: "#a17dc3",
        })}
      >
        <Tab.Screen
          name="restaurants"
          component={Restaurants}
          options={{ title: "Restaurants" }}
        />
        <Tab.Screen
          name="favorites"
          component={Favorites}
          options={{ title: "Favorites" }}
        />
        <Tab.Screen
          name="top-restaurants"
          component={TopRestaurants}
          options={{ title: "Top 5" }}
        />
        <Tab.Screen
          name="search"
          component={Search}
          options={{ title: "Search" }}
        />
        <Tab.Screen
          name="account"
          component={Account}
          options={{ title: "Account" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
