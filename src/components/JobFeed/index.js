import React from "react";
import styled from "styled-components";

import JobList from "./JobList";
import JobMenu from "./JobMenu";

const App = props => {
  const {
    count,
    search,
    setSearch,
    company,
    setCompany,
    remote,
    setRemote,
    jobs
  } = props;

  return (
    <Container>
      <JobMenu
        count={count}
        search={search}
        setSearch={setSearch}
        company={company}
        setCompany={setCompany}
        remote={remote}
        setRemote={setRemote}
      />
      <JobList jobs={jobs} />
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

export default App;
