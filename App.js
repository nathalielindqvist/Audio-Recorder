import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import HomeScreen from "./screens/Home";
import ListScreen from "./screens/List";
import AudioScreen from "./screens/Audio";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Start" }}
        />
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{ title: "List" }}
        />
        <Stack.Screen
          name="Audio"
          component={AudioScreen}
          options={{ title: "Audio" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
