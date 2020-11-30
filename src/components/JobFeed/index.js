import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setJobFocused } from "../../reducers/jobFocused";
import { setJobSelected } from "../../reducers/jobSelected";
import { applyJob } from "../../reducers/jobs";
import { useContainerSize } from "../../util/hooks";
import { reduceJobs } from "../../util";

import Status from "./Status";
import JobView from "./JobView";
import JobList from "./JobList";
import JobMenu from "./JobMenu";
import Menu from "./JobMenu/Menu";

const JobFeed = () => {
  // Set jobs state and fetch status
  const { pending, error } = useSelector((state) => state.jobs);
  const jobs = useSelector(reduceJobs);

  // Set job state and define actions
  const dispatch = useDispatch();
  const jobSelected = useSelector((state) => state.jobSelected);
  const focusJob = (job) => dispatch(setJobFocused(job));
  const selectJob = (job) => dispatch(setJobSelected(job));
  const apply = (job) => dispatch(applyJob(job.id));

  // Set menu height and toggle state
  const [menuVisible, setMenuVisible] = useState(false);
  const menuContainer = useRef();
  const { height } = useContainerSize(menuContainer);

  // Scroll to top of feed on render
  const feedContainer = useRef(null);
  useEffect(() => {
    feedContainer.current.scrollTo(0, 0);
  }, [jobSelected]);

  return (
    <Wrapper>
      <div ref={menuContainer}>
        <JobMenu jobs={jobs} toggle={() => setMenuVisible(!menuVisible)} />
      </div>
      <Container
        ref={feedContainer}
        offset={height}
        background={jobSelected ? "#ffffff" : "#f7fafc"}
      >
        <Status pending={pending} error={error} />
        {menuVisible ? (
          <Menu />
        ) : jobs.length !== 0 ? (
          jobSelected ? (
            <JobView job={jobSelected} selectJob={selectJob} apply={apply} />
          ) : (
            <JobList jobs={jobs} focusJob={focusJob} selectJob={selectJob} />
          )
        ) : null}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-right: 1px solid #edf2f6;
  @media (max-width: 900px) {
    border-right: none;
  }
`;

const Container = styled.div`
  height: ${({ offset }) => `calc(100vh - ${offset}px)`};
  overflow-y: scroll;
  background: ${({ background }) => background};
`;

export default JobFeed;
