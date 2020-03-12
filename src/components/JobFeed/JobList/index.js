import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { reduceJobs } from "../../../util";

import { Job } from "./Job";

const JobList = ({ jobs }) =>
  jobs ? (
    <Container>
      {jobs.map((job, i) => (
        <Job key={i} job={job} />
      ))}
    </Container>
  ) : null;

const Container = styled.ul`
  height: calc(100vh - 87px);
  padding: 20px;
  overflow: scroll;
  background: #f7fafc;
`;

const mapStateToProps = state => ({ jobs: reduceJobs(state) });

export default connect(mapStateToProps)(JobList);
