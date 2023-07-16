// audioSlice.js
import { createSlice } from "@reduxjs/toolkit";

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    recording: undefined,
    recordings: [],
    message: "",
  },
  reducers: {
    startRecording(state) {
      state.recording = "recording";
      state.message = "";
    },
    stopRecording(state, action) {
      state.recording = undefined;
      const { sound, recording } = action.payload;
      sound.stopAndUnloadAsync();
      const { sound: newSound, status } = sound.createNewLoadedSoundAsync();
      state.recordings.push({
        _id: uuid.v4(),
        sound: newSound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI(),
      });
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    deleteRecording(state, action) {
      const id = action.payload;
      state.recordings = state.recordings.filter((item) => item._id !== id);
    },
  },
});

export const { startRecording, stopRecording, setMessage, deleteRecording } =
  audioSlice.actions;

export default audioSlice.reducer;
