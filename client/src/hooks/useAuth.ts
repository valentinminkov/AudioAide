import { useContext } from "react";
import { AppContext, defaultState, APP_STATE_KEY } from "../context/AppContext";

export function useAuth() {
  const { setAppState } = useContext(AppContext);

  const logout = () => {
    setAppState(defaultState);
    localStorage.removeItem(APP_STATE_KEY);
  };

  return { logout };
}
