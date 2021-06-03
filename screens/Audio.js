import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { connect } from "react-redux";

class AudioRecorder extends Component {
  constructor(props) {
    super(props);

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.playSound = this.playSound.bind(this);
  }

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

  async stopRecording() {
    await this.props.recording.stopAndUnloadAsync();
    const URI = this.props.recording.getURI();
    this.props.setRecordingUri(URI);
    const fileName = "Recording " + this.props.recordingsArray.length;
    const object = { title: fileName, URI: URI };
    this.props.setRecordingsArray(object);
    this.props.setRecording(undefined);
  }

  async playSound() {
    const { sound } = await Audio.Sound.createAsync({
      uri: this.props.recordingUri,
    });
    await sound.playAsync();
  }

  async pauseSound() {
    await this.props.sound.pauseAsync();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.buttonText}>
          Press here to start your recording
        </Text>
        <Button title={"Start Recordning"} onPress={this.startRecording} />
        <Text style={styles.buttonText}>Press here to stop your recording</Text>
        <Button title={"Stop Recordning"} onPress={this.stopRecording} />
        <Text style={styles.buttonText}>
          Press here to play back your recording
        </Text>
        <Button title={"Play Recordning"} onPress={this.playSound} />
      </View>
    );
  }
}

function mapStateToProps(state) {
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

export default connect(mapStateToProps, mapDispatchToProps)(AudioRecorder);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    marginTop: 80,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 16,
  },
});
