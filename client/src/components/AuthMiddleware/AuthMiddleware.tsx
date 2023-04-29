import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { User } from "../../interfaces/Spotify";

interface AuthMiddlewareProps {
  element: React.ReactElement;
}

const isAuthenticated = (user?: User) => {
  return !!user;
};

const AuthMiddleware = ({ element }: AuthMiddlewareProps) => {
  const { appState } = useContext(AppContext) || {};

  const { user } = appState;

  if (!isAuthenticated(user)) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default AuthMiddleware;
