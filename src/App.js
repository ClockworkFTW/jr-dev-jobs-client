import React from "react";
import { Provider } from "react-redux";

import store from "./store";

import { GlobalStyle } from "./components/common";
import JobFeed from "./components/JobFeed";
import Mapbox from "./components/Mapbox";

const App = () => (
  <Provider store={store}>
    <GlobalStyle />
    <JobFeed />
    <Mapbox />
  </Provider>
);

export default App;
