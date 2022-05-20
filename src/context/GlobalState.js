import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  addressStart: {
    number: "",
    street: "",
    city: "",
    postcode: "",
    country: "",
  },
  addressFinish: {
    number: "",
    street: "",
    city: "",
    postcode: "",
    country: "",
  },
  coordsStart: [0, 0],
  coordsFinish: [0, 0],
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

  return (
    <GlobalContext.Provider
      value={{
        addressStart: state.addressStart,
        addressFinish: state.addressFinish,
        coordsStart: state.coordsStart,
        coordsFinish: state.coordsFinish,
        setAddressStart,
        setAddressFinish,
        setCoordsStart,
        setCoordsFinish,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
