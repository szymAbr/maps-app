import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  addressStart: "",
  addressFinish: "",
  coordsStart: [0, 0],
  coordsFinish: [0, 0],
  startUpdated: false,
  finishUpdated: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setAddressStart(address) {
    dispatch({
      type: "SET_ADDRESS_START",
      payload: address,
    });
  }

  function setAddressFinish(address) {
    dispatch({
      type: "SET_ADDRESS_FINISH",
      payload: address,
    });
  }

  function setCoordsStart(coords) {
    dispatch({
      type: "SET_COORDS_START",
      payload: coords,
    });
  }

  function setCoordsFinish(coords) {
    dispatch({
      type: "SET_COORDS_FINISH",
      payload: coords,
    });
  }

  function setStartUpdated(boolean) {
    dispatch({
      type: "SET_START_UPDATED",
      payload: boolean,
    });
  }

  function setFinishUpdated(boolean) {
    dispatch({
      type: "SET_FINISH_UPDATED",
      payload: boolean,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        addressStart: state.addressStart,
        addressFinish: state.addressFinish,
        coordsStart: state.coordsStart,
        coordsFinish: state.coordsFinish,
        startUpdated: state.startUpdated,
        finishUpdated: state.finishUpdated,
        setAddressStart,
        setAddressFinish,
        setCoordsStart,
        setCoordsFinish,
        setStartUpdated,
        setFinishUpdated,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
