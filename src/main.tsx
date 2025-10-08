import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { BrowserRouter as Router } from "react-router-dom";
import { persistor } from "./app/persistor.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StrictMode>
        <Router>
          <App />
        </Router>
      </StrictMode>
    </PersistGate>
  </Provider>,
);
