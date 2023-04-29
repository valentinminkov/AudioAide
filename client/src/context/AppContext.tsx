import { createContext } from "react";
import { User } from "../interfaces/Spotify";

const VERSION = "0.01";

export const APP_STATE_KEY = `audioaide.state.${VERSION}`;

export interface AppState {
  user?: User;
}

export const defaultState: AppState = {
  user: undefined,
};

type AppContextValue = {
  appState: AppState;
  setAppState: (value: Partial<AppState>) => void;
};

export const AppContext = createContext<AppContextValue>({
  appState: defaultState,
  setAppState: (value: Partial<AppState>) => {},
});
