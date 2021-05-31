import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";

export default function AudioRecorder() {
  const [recordings, setRecordings] = useState([]);
  const [recording, setRecording] = useState();
  const [recordingUri, setRecordingUri] = useState();
  const [sound, setSound] = useState();

  useEffect(() => {
    async () => {
      Audio.requestPermissionsAsync();
      Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })();
    };
  }, []);

  async function initRecordning() {
    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(
      Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    );
    await recording.startAsync();
    setRecording(recording);
  }

  async function startRecording() {
    try {
      initRecordning();
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    await recording.stopAndUnloadAsync();
    setRecordingUri(recording.getURI());

    if (recordings.length == 0) {
      recordings.push(recording.getURI());
      setRecordings(recordings);
    } else {
      let newState = [...recordings];
      console.log(newState);
      newState.push(recording.getURI());
      console.log("test", newState);
      setRecordings(newState);
    }
    setRecording(undefined);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({
      uri: recordingUri,
    });
    setSound(sound);
    await sound.playAsync();
  }

  async function pauseSound() {
    await sound.pauseAsync();
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button title={"Play Recordning"} onPress={playSound} />
      <Button title={"Pause Recordning"} onPress={pauseSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
});
