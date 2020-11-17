import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Import redux actions
import { fetchJobs } from "./reducers/jobs";
import { fetchLocation } from "./reducers/location";

// Import hooks
import { useContainerSize } from "./util/hooks";

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

  const container = useRef(null);
  const size = useContainerSize(container);

  return (
    <>
      <GlobalStyle />
      <Container ref={container}>
        <div>
          <JobFeed />
        </div>
        {size.width > 900 ? (
          <div style={{ position: "relative" }}>
            <Mapbox />
          </div>
        ) : null}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 700px 1fr;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export default App;
