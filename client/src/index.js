import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import ReduxStore from "./Redux/store";
import {} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.render(
  <Provider store={ReduxStore.store}>
    {/* <PersistGate persistor={ReduxStore.persistedStore}> */}
    <App />,{/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);
