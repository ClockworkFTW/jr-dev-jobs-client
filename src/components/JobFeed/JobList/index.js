import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { reduceJobs } from "../../../util";

import { Status } from "./Status";
import { Job } from "./Job";

const JobList = ({ jobs, pending, error }) =>
  jobs ? (
    <Wrapper>
      <Status pending={pending} error={error} />
      <Container>
        {jobs.map((job, i) => (
          <Job key={i} job={job} />
        ))}
      </Container>
    </Wrapper>
  ) : null;

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

export default connect(mapStateToProps)(JobList);
