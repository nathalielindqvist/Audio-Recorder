import React, { Component } from "react";
import { View, Button, Text, Stylesheet } from "react-native";
import store from "./store";

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordingsArray: [],
    };

    store.subscribe(() => {
      this.setState({
        recordingsArray: store.getState().recordingsArray,
      });
    });
  }
  render() {
    return (
      <View>
        <Text>{this.state.recordingsArray}</Text>
      </View>
    );
  }
}
