import React, { Component } from "react";
import { render } from "react-dom";
import { StyleSheet } from "react-native";

import AudioRecorder from "./Audio";
import store from "./store";
import { Provider } from "react-redux";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <AudioRecorder />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  firstText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  buttonText: {
    marginBottom: 10,
    marginTop: 40,
    padding: 5,
    fontSize: 14,
  },
});
