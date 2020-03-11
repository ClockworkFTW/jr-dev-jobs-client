import React from "react";
import styled from "styled-components";

import { Job } from "./Job";

const JobList = ({ jobs }) => (
  <Container>
    {jobs.map((job, i) => (
      <Job key={i} job={job} />
    ))}
  </Container>
);

const Container = styled.ul`
  height: calc(100vh - 87px);
  padding: 20px;
  overflow: scroll;
  background: #f7fafc;
`;

export default JobList;
