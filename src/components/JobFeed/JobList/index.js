import React from "react";
import styled from "styled-components";

import Job from "./Job";

const JobList = ({ jobs, setJob }) => (
  <Container>
    {jobs.map((job, i) => (
      <Job key={i} job={job} setJob={setJob} />
    ))}
  </Container>
);

const Container = styled.ul`
  padding: 20px;
  @media (max-width: 900px) {
    padding: 0;
  }
`;

export default JobList;
