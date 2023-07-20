import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import * as Sharing from "expo-sharing";
import uuid from "react-native-uuid";
import { FontAwesome } from "@expo/vector-icons";

export default function App() {
  const [recording, setRecording] = useState(undefined);
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const { sound, status } = await recording.createNewLoadedSoundAsync();

    setRecordings((recordings) => {
      return [
        ...recordings,
        {
          _id: uuid.v4(),
          sound,
          duration: getDurationFormatted(status.durationMillis),
          file: recording.getURI(),
        },
      ];
    });
  }

  const deleteHandler = (id) => {
    return setRecordings((recordings) =>
      recordings.filter((item) => item._id !== id)
    );
  };
  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Audio {index + 1} - {recordingLine.duration}
          </Text>
          <Button
            style={styles.button}
            onPress={() => recordingLine.sound.replayAsync()}
            title="Play"
          ></Button>
          <Button
            style={styles.button}
            onPress={() => Sharing.shareAsync(recordingLine.file)}
            title="Share"
          ></Button>
          <Button
            style={styles.button}
            onPress={deleteHandler.bind(this, recordingLine._id)}
            title="Delete"
          ></Button>
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      {/* <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={}
      /> */}
      <TouchableOpacity
        style={styles.niceBtn}
        onPress={recording ? stopRecording : startRecording}
      >
        <FontAwesome
          name={recording ? "stop-circle" : "circle"}
          size={64}
          color="white"
        />
      </TouchableOpacity>
      <ScrollView>{getRecordingLines()}</ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    height: 40,
    backgroundColor: "red",
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16,
  },
  niceBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "red",
    marginHorizontal: 120,
    marginBottom: 50,
  },
});
