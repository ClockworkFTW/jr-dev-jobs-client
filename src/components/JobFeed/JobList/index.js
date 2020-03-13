import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { reduceJobs } from "../../../util";
import { setViewport } from "../../../reducers/map";
import { setFavorite } from "../../../reducers/jobs";

import { Status } from "./Status";
import { Count } from "./Count";
import { Job } from "./Job";

const JobList = ({ jobs, pending, error, setViewport, setFavorite }) => {
  const flyTo = coords => {
    if (coords) {
      setViewport({
        latitude: coords.lat,
        longitude: coords.lng,
        zoom: 10
      });
    }
  };

  return (
    <Wrapper>
      <Status pending={pending} error={error} />
      <Container>
        <Count count={jobs.length} />
        {jobs.map((job, i) => (
          <Job key={i} job={job} flyTo={flyTo} setFavorite={setFavorite} />
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(100vh - 87px);
  overflow: scroll;
  background: #f7fafc;
`;

const Container = styled.ul`
  padding: 20px;
`;

const mapStateToProps = state => ({
  jobs: reduceJobs(state),
  pending: state.jobs.pending,
  error: state.jobs.error
});

export default connect(mapStateToProps, { setViewport, setFavorite })(JobList);
