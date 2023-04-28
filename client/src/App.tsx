// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthCallback from "./components/AuthCallback/AuthCallback";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth_callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
};

export default App;
  