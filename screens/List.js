import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
        <Text style={styles.firstText}>Your recordings</Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
              keyExtractor={(item, index) => index.toString()}
              onPress={() => {
                this.playSound(item);
              }}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
            >
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
  firstText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
  },
  listItem: {
    backgroundColor: "#0292f9",
    marginTop: 15,
    height: 50,
  },
  listItemText: {
    paddingLeft: 20,
    lineHeight: 50,
    fontSize: 16,
    color: "white",
  },
  buttonText: {
    marginBottom: 10,
    marginTop: 40,
    padding: 5,
    fontSize: 14,
  },
});
