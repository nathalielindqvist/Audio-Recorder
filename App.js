import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React, { Component } from "react";
import { StyleSheet } from "react-native";

import HomeScreen from "./screens/Home";
import ListScreen from "./screens/List";
import AudioScreen from "./screens/Audio";
import store from "./store";
import { Provider } from "react-redux";

const Stack = createStackNavigator();
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
              options={{ title: "Library" }}
            />
            <Stack.Screen
              name="Audio"
              component={AudioScreen}
              options={{ title: "Audio recorder" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
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
