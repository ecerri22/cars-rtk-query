import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bulma/css/bulma.css';    
import { Provider } from "react-redux";
import { store } from "./store";
import { Provider as ContextProvider } from "./components/context/cars.js"

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);


root.render(
    <Provider store={store}>
        <ContextProvider>
          <App />
        </ContextProvider>
    </Provider>
);


