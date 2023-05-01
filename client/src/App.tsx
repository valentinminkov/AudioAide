// src/App.tsx
import React from "react";
import styles from "./App.module.scss";
import AppRoutes from "./routes";

const App = () => {
  return (
    <div className={styles.container}>
      <AppRoutes />
    </div>
  );
};

export default App;
