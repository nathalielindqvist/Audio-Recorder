import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  recordingsArray: [],
  recording: {},
  recordingUri: "",
  sound: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RECORDINGS_ARRAY":
      return { recordingsArray: recordingsArray.push(action.payload.array) };
    case "SET_RECORDING":
      return { recording: action.payload.recordingState };

    case "SET_RECORDING_URI":
      return { recordingUri: action.payload.UriString };
    case "SET_SOUND":
      return {};
  }
  return state;
};

const store = createStore(reducer);

export default store;
