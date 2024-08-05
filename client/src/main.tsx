import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context/index";
import { App } from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={11155111} clientId= 'e3328268cb9380113ff1ef19bc806016'>
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
