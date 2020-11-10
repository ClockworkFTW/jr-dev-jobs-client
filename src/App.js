import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Import redux actions
import { fetchJobs } from "./reducers/jobs";
import { fetchLocation } from "./reducers/location";

// Import components
import { GlobalStyle } from "./components/common";
import JobFeed from "./components/JobFeed";
import Mapbox from "./components/Mapbox";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchLocation());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <JobFeed />
      <Mapbox />
    </>
  );
};

export default App;
