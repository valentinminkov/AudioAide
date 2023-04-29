import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

interface AuthMiddlewareProps {
  element: React.ReactElement;
}

const isAuthenticated = (userId?: string) => {
  return !!userId;
};

const AuthMiddleware = ({ element }: AuthMiddlewareProps) => {
  const { appState } = useContext(AppContext) || {};

  const { userId } = appState;

  if (!isAuthenticated(userId)) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default AuthMiddleware;
