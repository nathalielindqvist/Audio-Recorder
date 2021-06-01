import React, { useState, useEffect, Component } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { connect } from "react-redux";
import store from "./store";

class AudioRecorder extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       recordingsArray: [],
  //       recording: {},
  //       recordingUri: "",
  //       sound: {},
  //     };

  //     store.subscribe(() => {
  //       this.setState({
  //         recordingsArray: store.getState().recordingsArray,
  //         recording: store.getState().recording,
  //         recordingUri: store.getState().recordingUri,
  //         sound: store.getState().sound,
  //       });
  //     });
  //   }
  // const [recordings, setRecordings] = useState([]);
  // const [recording, setRecording] = useState();
  // const [recordingUri, setRecordingUri] = useState();
  // const [sound, setSound] = useState();

  //   useEffect(() => {
  //     async () => {};
  //   }, []);

  //   async function initRecordning() {

  //   }

  async startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      this.props.setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async stopRecording(recordingState) {
    await this.props.recording.stopAndUnloadAsync();
    const URI = this.props.recording.getURI();
    this.props.setRecordingUri(URI);

    // if (this.props.recordingArray.length == 0) {
    this.props.setRecordingsArray(URI);
    //   setRecordings(recordings);
    // } else {
    //   let newState = [...recordings];
    //   console.log(newState);
    //   newState.push(recording.getURI());
    //   console.log("test", newState);
    //   setRecordings(newState);
    // }
    this.props.setRecording(undefined);
  }

  async playSound() {
    const { sound } = await Audio.Sound.createAsync({
      uri: this.props.recordingUri,
    });
    setSound(sound);
    await this.props.sound.playAsync();
  }

  async pauseSound() {
    await this.props.sound.pauseAsync();
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          title={this.props.recording ? "Start Recording" : "Stop Recording"}
          onPress={
            this.props.recording ? this.stopRecording : this.startRecording
          }
        />
        <Button title={"Play Recordning"} onPress={this.playSound} />
        <Button title={"Pause Recordning"} onPress={this.pauseSound} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    recordingsArray: state.recordingsArray,
    recording: state.recording,
    recordingUri: state.recordingUri,
    sound: state.sound,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRecordingsArray: (array) =>
      dispatch({ type: "SET_RECORDINGS_ARRAY", payload: array }),
    setRecording: (recordingState) =>
      dispatch({ type: "SET_RECORDING", payload: recordingState }),
    setRecordingUri: (UriString) =>
      dispatch({ type: "SET_RECORDING_URI", payload: UriString }),
    setSound: () => dispatch({ type: "SET_SOUND" }),
  };
}

export default connect(mapStateToProps)(AudioRecorder);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
});
