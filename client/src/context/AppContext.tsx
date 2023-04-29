import { createContext } from "react";
import { User } from "../interfaces/Spotify";

export interface AppState {
  userId?: string;
  user?: User;
}

export const defaultState: AppState = {
  userId: undefined,
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
