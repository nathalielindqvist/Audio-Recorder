import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import HomeScreen from "./screens/Home";
import ListScreenWrapper from "./screens/List-wrapper";
import AudioWrapperScreen from "./screens/Audio-wrapper";
// import AudioRecorder from "./screens/Audio";

const Stack = createStackNavigator();
export default class App extends Component {
  render() {
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
            component={ListScreenWrapper}
            options={{ title: "List" }}
          />
          <Stack.Screen
            name="Audio-wrapper"
            component={AudioWrapperScreen}
            options={{ title: "Audio" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
