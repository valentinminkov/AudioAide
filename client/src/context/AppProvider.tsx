// src/context/AppProvider.js
import React, { useState, useEffect } from "react";
import { AppContext, AppState, defaultState } from "./AppContext";

const VERSION = "0.01";
export const APP_STATE_KEY = `audioaide.state.${VERSION}`;

interface Props {
  children: React.ReactNode;
}

function AppProvider({ children }: Props) {
  const [state, setState] = useState(() => {
    const appState = localStorage.getItem(APP_STATE_KEY);
    return appState ? JSON.parse(appState) : defaultState;
  });

  useEffect(() => {
    // Store the appState object in local storage
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
  }, [state]);

  const handleSetAppState = (value: Partial<AppState>) => {
    setState((prevState: AppState) => ({ ...prevState, ...value }));
  };

  return (
    <AppContext.Provider
      value={{ appState: state, setAppState: handleSetAppState }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
