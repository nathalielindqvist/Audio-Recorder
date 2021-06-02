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

// store.subscribe(() => {
//   const state = store.getState().recordingsArray;
console.log(this.state.recordingsArray.map((item) => item.title));
// });

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

const ItemView = () => {
  return <Text>{data.name}</Text>;
};

class List extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   recordingsArray: [],
    // };

    // store.subscribe(() => {
    //   this.setState({
    //     recordingsArray: store.getState().recordingsArray,
    //   });
    //   console.log(this.state.recordingsArray);
    // });
  }

  render() {
    return (
      <View>
        <Text>Hej</Text>
        {/* <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        /> */}
        <FlatList
          ItemSeparatorComponent={
            Platform.OS !== "android" &&
            (({ highlighted }) => (
              <View
                style={[style.separator, highlighted && { marginLeft: 0 }]}
              />
            ))
          }
          data={[{ data }]}
          renderItem={({ item, index, separators }) => (
            <TouchableHighlight
              keyExtractor={(item, index) => index.toString()}
              onPress={() => this._onPress(item)}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
            >
              <View style={{ backgroundColor: "white" }}>
                <Text>{item.name}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  //   console.log(state.recordingsArray.map((item) => item.title));
  return {
    recordingsArray: state.recordingsArray,
  };
}

export default connect(mapStateToProps)(List);
