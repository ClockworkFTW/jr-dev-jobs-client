import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchJobs } from "../../reducers/jobs";
import { fetchLocation } from "../../reducers/location";

import JobList from "./JobList";
import JobMenu from "./JobMenu";

const App = ({ fetchJobs, fetchLocation }) => {
  useEffect(() => {
    fetchJobs();
    fetchLocation();
  }, []);

  return (
    <Container>
      <JobMenu />
      <JobList />
    </Container>
  );
};

const Container = styled.div`
  width: 600px;
  float: left;
  @media (max-width: 900px) {
    width: 100%;
    float: none;
  }
`;

export default connect(null, { fetchJobs, fetchLocation })(App);
