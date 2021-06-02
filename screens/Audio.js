// import React, { useState, useEffect, Component } from "react";
// import { View, Button, Text, StyleSheet } from "react-native";
// import { Audio } from "expo-av";
// import { connect } from "react-redux";
// import store from "./store";

// class AudioRecorder extends Component {
//   //   constructor(props) {
//   //     super(props);

//   //     this.state = {
//   //       recordingsArray: [],
//   //       recording: {},
//   //       recordingUri: "",
//   //       sound: {},
//   //     };

//   //     store.subscribe(() => {
//   //       this.setState({
//   //         recordingsArray: store.getState().recordingsArray,
//   //         recording: store.getState().recording,
//   //         recordingUri: store.getState().recordingUri,
//   //         sound: store.getState().sound,
//   //       });
//   //     });
//   //   }
//   // const [recordings, setRecordings] = useState([]);
//   // const [recording, setRecording] = useState();
//   // const [recordingUri, setRecordingUri] = useState();
//   // const [sound, setSound] = useState();

//   //   useEffect(() => {
//   //     async () => {};
//   //   }, []);

//   //   async function initRecordning() {

//   //   }

//   async startRecording() {
//     try {
//       await Audio.requestPermissionsAsync();
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });
//       const recording = new Audio.Recording();
//       await recording.prepareToRecordAsync(
//         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//       );
//       await recording.startAsync();
//       console.log("test");
//       this.props.dispatch().setRecording(recording);
//     } catch (err) {
//       console.error("Failed to start recording", err);
//     }
//   }

//   async stopRecording(recordingState) {
//     await this.props.recording.stopAndUnloadAsync();
//     const URI = this.props.recording.getURI();
//     this.props.setRecordingUri(URI);

//     // if (this.props.recordingArray.length == 0) {
//     this.props.setRecordingsArray(URI);
//     //   setRecordings(recordings);
//     // } else {
//     //   let newState = [...recordings];
//     //   console.log(newState);
//     //   newState.push(recording.getURI());
//     //   console.log("test", newState);
//     //   setRecordings(newState);
//     // }
//     this.props.setRecording(undefined);
//   }

//   async playSound() {
//     const { sound } = await Audio.Sound.createAsync({
//       uri: this.props.recordingUri,
//     });
//     setSound(sound);
//     await this.props.sound.playAsync();
//   }

//   async pauseSound() {
//     await this.props.sound.pauseAsync();
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <Button
//           title={
//             this.props.recording.length ? "Stop Recording" : "Start Recording"
//           }
//           onPress={
//             this.props.recording === undefined
//               ? this.stopRecording
//               : this.startRecording
//           }
//         />
//         <Button title={"Play Recordning"} onPress={this.playSound} />
//         <Button title={"Pause Recordning"} onPress={this.pauseSound} />
//       </View>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     recordingsArray: state.recordingsArray,
//     recording: state.recording,
//     recordingUri: state.recordingUri,
//     sound: state.sound,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     setRecordingsArray: (array) =>
//       dispatch({ type: "SET_RECORDINGS_ARRAY", payload: array }),
//     setRecording: (recordingState) =>
//       dispatch({ type: "SET_RECORDING", payload: recordingState }),
//     setRecordingUri: (UriString) =>
//       dispatch({ type: "SET_RECORDING_URI", payload: UriString }),
//     setSound: () => dispatch({ type: "SET_SOUND" }),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AudioRecorder);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 100,
//   },
// });

import React, { useState, useEffect, Component } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { connect } from "react-redux";
import store from "./store";

class AudioRecorder extends Component {
  constructor(props) {
    super(props);

    // This binding thing is still something strange for me, but crucial when working with redux
    // (There's a reason for it, but it's unintuitive to implement)
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

      // now with `this` binded, we can access `this.props`
      // the redux will map all functions to `props` directly, no need to call `dispatch` here.
      // (It's one of the things I always confuse)
      this.props.setRecording(recording);
      console.log("Start recording");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async stopRecording(recordingState) {
    await this.props.recording.stopAndUnloadAsync();
    const URI = this.props.recording.getURI();
    this.props.setRecordingUri(URI);
    this.props.setRecordingsArray(URI);
    console.log(this.props.recordingsArray);
    this.props.setRecording(undefined);
  }

  async playSound() {
    const { sound } = await Audio.Sound.createAsync({
      uri: this.props.recordingUri,
    });

    // the `sound` is a local value, in case it's still confusing with `this`
    // read about lexical scopes, it's a huge topic in JS, no need to master it
    // but getting some ideas can be helpful.
    await sound.playAsync();
  }

  // I removed this button, remember to `bind` it if you wanted to add the pause functionality
  async pauseSound() {
    await this.props.sound.pauseAsync();
  }
  render() {
    return (
      <View style={styles.container}>
        {/* I simplified this part to make it work, inline conditional function calls can be tricky, be careful when you'll update it (it was working properly in the other branch) */}
        <Button title={"Start Recordning"} onPress={this.startRecording} />
        <Button title={"Stop Recordning"} onPress={this.stopRecording} />
        <Button title={"Play Recordning"} onPress={this.playSound} />
      </View>
    );
  }
}

// These are all good, good job!
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

// Good job here too! I still get confused with these settings sometimes
export default connect(mapStateToProps, mapDispatchToProps)(AudioRecorder);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
});
