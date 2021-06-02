import React, { Component } from "react";
import { View, Button, Text, Stylesheet, FlatList } from "react-native";
import store from "./store";
import { connect } from "react-redux";

// store.subscribe(() => {
//   const state = store.getState().recordingsArray;
//   console.log(state);
// });

const ItemView = () => {
  return (
    <ListItem bottomDivider>
      <Text>{title}</Text>
    </ListItem>
  );
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
        <FlatList>
          data={this.props.recordingsArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        </FlatList>
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.recordingsArray);
  return {
    recordingsArray: state.recordingsArray,
  };
}

export default connect(mapStateToProps)(List);
