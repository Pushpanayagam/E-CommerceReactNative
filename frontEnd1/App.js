import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Homescreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import ProductListScreen from "./screens/ProductListScreen.js";
import ProductDetailScreen from "./screens/ProductDetailScreen.js";
import CartScreen from "./screens/CartScreen.js";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Products" component={ProductListScreen} />
        <Stack.Screen name="Detail" component={ProductDetailScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
