import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  Stylesheet,
  FlatList,
  TouchableHighlight,
} from "react-native";
import store from "./store";
import { connect } from "react-redux";

export default function List() {
  store.subscribe(() => {
    global.state = store.getState().recordingsArray;
    console.log(state.map((item) => item.title));
  });

  const data = [
    {
      id: 1,
      name: "Karl",
    },
    {
      id: 2,
      name: "Ellie",
    },
    {
      id: 3,
      name: "Son",
    },
  ];

  // this.state = {
  //   recordingsArray: [],
  // };

  // store.subscribe(() => {
  //   this.setState({
  //     recordingsArray: store.getState().recordingsArray,
  //   });
  // });
  // console.log(this.state.recordingsArray);

  const ItemView = () => {
    <Text>{state.map((item) => item.title)}</Text>;
  };

  return (
    <View>
      <Text>Hej</Text>
      {/* <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />  */}
      <FlatList
        ItemSeparatorComponent={
          Platform.OS !== "android" &&
          (({ highlighted }) => (
            <View style={[style.separator, highlighted && { marginLeft: 0 }]} />
          ))
        }
        data={[{ state }]}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight
            keyExtractor={(item, index) => index.toString()}
            onPress={() => this._onPress(item)}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
          >
            <View style={{ backgroundColor: "white" }}>
              <Text>{ItemView}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
}

// function mapStateToProps(state) {
//     console.log(state.recordingsArray.map((item) => item.title));
//   return {
//     recordingsArray: state.recordingsArray,
//   };
// }
