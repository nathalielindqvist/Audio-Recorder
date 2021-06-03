import React, { Component } from "react";
import { View, Text, FlatList, TouchableHighlight } from "react-native";
import { Audio } from "expo-av";
import { connect } from "react-redux";

class List extends Component {
  constructor(props) {
    super(props);
  }
  async playSound(item) {
    const { sound } = await Audio.Sound.createAsync({
      uri: item.URI,
    });
    await sound.stopAsync();
    await sound.playAsync();
  }
  render() {
    const data = this.props.recordingsArray;
    const ItemView = ({ item }) => {
      return <Text>{item.title}</Text>;
    };
    return (
      <View>
        <Text>Hej</Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index, separators }) => (
            <TouchableHighlight
              keyExtractor={(item, index) => index.toString()}
              onPress={() => {
                this.playSound(item);
              }}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
            >
              <View
                style={{ backgroundColor: "white", marginTop: 15, height: 50 }}
              >
                <Text style={{ paddingLeft: 20, lineHeight: 50 }}>
                  {item.title}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    recordingsArray: state.recordingsArray,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
