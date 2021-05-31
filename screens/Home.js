import React, { Component } from "react";
import { render } from "react-dom";
import { View, Button, Text, StyleSheet } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text style={styles.firstText}>Welcome!</Text>
        <Text style={styles.buttonText}>Record new audio clips</Text>
        <Button
          title="Go to Audio"
          onPress={() => this.props.navigation.navigate("Audio")}
        />
        <Text style={styles.buttonText}>See your library</Text>
        <Button
          title="Go to List"
          onPress={() => this.props.navigation.navigate("List")}
        />
      </View>
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
