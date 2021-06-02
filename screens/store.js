// import { createStore } from "redux";
// import { Provider } from "react-redux";

// const initialState = {
//   recordingsArray: [],
//   recording: {},
//   recordingUri: "",
//   sound: {},
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_RECORDINGS_ARRAY":
//       return { recordingsArray: recordingsArray.push(action.payload.array) };
//     case "SET_RECORDING":
//       return { recording: action.payload.recordingState };

//     case "SET_RECORDING_URI":
//       return { recordingUri: action.payload.UriString };
//     case "SET_SOUND":
//       return {};
//   }
//   return state;
// };

// const store = createStore(reducer);

// export default store;

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
      // I didn't update this part of code, the `.array` part is not needed I guess.
      return {
        ...state,
        recordingsArray: state.recordingsArray.push(action.payload),
      };
    case "SET_RECORDING":
      // Added `...state` to return whole state in each mutation
      // (doesn't affect functionality in this case, but better practice).
      // `action.payload` is enough, we don't need to access the nested value.
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
