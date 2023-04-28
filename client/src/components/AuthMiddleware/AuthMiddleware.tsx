import React from "react";
import { Navigate } from "react-router-dom";

interface AuthMiddlewareProps {
  element: React.ReactElement;
}

const isAuthenticated = () => {
  const userId = localStorage.getItem("user_id");
  return !!userId;
};

const AuthMiddleware = ({ element }: AuthMiddlewareProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return element ;
};

export default AuthMiddleware;
