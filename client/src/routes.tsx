import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthMiddleware from "./components/AuthMiddleware/AuthMiddleware";
import AuthCallback from "./components/AuthCallback/AuthCallback";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Library from "./components/Library/Library";
import Discover from "./components/Discover/Discover";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth_callback" element={<AuthCallback />} />
      {/* Protected routes */}
      <Route path="/" element={<AuthMiddleware element={<Home />} />} />
      <Route
        path="/library"
        element={<AuthMiddleware element={<Library />} />}
      />
      <Route
        path="/discover"
        element={<AuthMiddleware element={<Discover />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
