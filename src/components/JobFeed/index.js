import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { reduceJobs } from "../../util";

import Status from "./Status";
import JobView from "./JobView";
import JobList from "./JobList";
import JobMenu from "./JobMenu";

const JobFeed = () => {
  const { pending, error } = useSelector((state) => state.jobs);
  const jobs = useSelector((state) => reduceJobs(state));
  const [viewing, setViewing] = useState(null);

  return (
    <Container>
      <JobMenu />
      <Content viewing={viewing}>
        <Status pending={pending} error={error} />
        {jobs.length !== 0 ? (
          viewing ? (
            <JobView job={viewing} setViewing={setViewing} />
          ) : (
            <JobList jobs={jobs} setViewing={setViewing} />
          )
        ) : null}
      </Content>
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

const Content = styled.div`
  height: calc(100vh - 83px);
  padding: 20px;
  overflow-y: scroll;
  background: ${({ viewing }) => (viewing ? "#ffffff" : "#f7fafc")};
`;

export default JobFeed;
