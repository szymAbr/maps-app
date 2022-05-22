export default function AppReducer(state, action) {
  switch (action.type) {
    case "SET_ADDRESS_START":
      return {
        ...state,
        addressStart: action.payload,
      };
    case "SET_ADDRESS_FINISH":
      return {
        ...state,
        addressFinish: action.payload,
      };
    case "SET_COORDS_START":
      return {
        ...state,
        coordsStart: action.payload,
      };
    case "SET_COORDS_FINISH":
      return {
        ...state,
        coordsFinish: action.payload,
      };
    case "SET_START_UPDATED":
      return {
        ...state,
        startUpdated: action.payload,
      };
    case "SET_FINISH_UPDATED":
      return {
        ...state,
        finishUpdated: action.payload,
      };
    default:
      return state;
  }
}
