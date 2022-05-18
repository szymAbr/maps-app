export default function AppReducer(state, action) {
  switch (action.type) {
    case "SET_ADDRESS_START":
      return {
        ...state,
        addressStart: { ...action.payload },
      };
    case "SET_ADDRESS_FINISH":
      return {
        ...state,
        addressFinish: { ...action.payload },
      };
    default:
      return state;
  }
}
