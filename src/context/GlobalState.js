import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  addressStart: "",
  addressEnd: "",
  coordsStart: [0, 0],
  coordsEnd: [0, 0],
  startUpdated: false,
  endUpdated: false,
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

  function setAddressEnd(address) {
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

  function setCoordsEnd(coords) {
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

  function setEndUpdated(boolean) {
    dispatch({
      type: "SET_FINISH_UPDATED",
      payload: boolean,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        addressStart: state.addressStart,
        addressEnd: state.addressEnd,
        coordsStart: state.coordsStart,
        coordsEnd: state.coordsEnd,
        startUpdated: state.startUpdated,
        endUpdated: state.endUpdated,
        setAddressStart,
        setAddressEnd,
        setCoordsStart,
        setCoordsEnd,
        setStartUpdated,
        setEndUpdated,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
