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
  coordinatesStart: {
    lat: 0,
    lng: 0,
  },
  coordinatesFinish: {
    lat: 0,
    lng: 0,
  },
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

  return (
    <GlobalContext.Provider
      value={{
        addressStart: state.addressStart,
        addressFinish: state.addressFinish,
        coordinatesStart: state.coordinatesStart,
        coordinatesFinish: state.coordinatesFinish,
        setAddressStart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
