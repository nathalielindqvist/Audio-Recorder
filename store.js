import { createStore } from "redux";

const initialState = {
  recordingsArray: [],
  recording: {},
  recordingUri: "",
  sound: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RECORDINGS_ARRAY":
      return {
        recordingsArray: [...state.recordingsArray, action.payload],
      };
    case "SET_RECORDING":
      return { ...state, recording: action.payload };
    case "SET_RECORDING_URI":
      return { ...state, recordingUri: action.payload };
    case "SET_SOUND":
      return {};
  }
  return state;
};

const store = createStore(reducer);

export default store;
