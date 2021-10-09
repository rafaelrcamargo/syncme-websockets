import React from "react";
import { SyncProvider } from "./context/SyncContext";
import Routes from "./routes/Routes";

import "./styles/App.css";

const App = () => {
  return (
    <SyncProvider>
      <Routes />
    </SyncProvider>
  );
};

export default App;
