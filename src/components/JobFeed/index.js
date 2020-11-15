import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setViewing } from "../../reducers/job";
import { applyJob, highlightJob } from "../../reducers/jobs";
import { useContainerSize } from "../../util/hooks";
import { reduceJobs } from "../../util";

import Status from "./Status";
import JobView from "./JobView";
import JobList from "./JobList";
import JobMenu from "./JobMenu";
import Menu from "./JobMenu/Menu";

const JobFeed = () => {
  // Set jobs state and status
  const { pending, error } = useSelector((state) => state.jobs);
  const jobs = useSelector((state) => reduceJobs(state));

  // Set job state and define selector
  const dispatch = useDispatch();
  const job = useSelector((state) => state.job);
  const view = (job) => dispatch(setViewing(job));
  const highlight = (job) => dispatch(highlightJob(job.id));
  const apply = (job) => dispatch(applyJob(job.id));

  // Set menu height and toggle state
  const [menuVisible, setMenuVisible] = useState(false);
  const menuContainer = useRef();
  const { height } = useContainerSize(menuContainer);

  // Scroll to top of feed on render
  const feedContainer = useRef(null);
  useEffect(() => {
    feedContainer.current.scrollTo(0, 0);
  }, [job]);

  return (
    <Wrapper>
      <div ref={menuContainer}>
        <JobMenu jobs={jobs} toggle={() => setMenuVisible(!menuVisible)} />
      </div>
      <Container viewing={job} offset={height} ref={feedContainer}>
        <Status pending={pending} error={error} />
        {menuVisible ? (
          <Menu />
        ) : jobs.length !== 0 ? (
          job ? (
            <JobView job={job} view={view} apply={apply} />
          ) : (
            <JobList jobs={jobs} view={view} highlight={highlight} />
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
  background: ${({ viewing }) => (viewing ? "#ffffff" : "#f7fafc")};
`;

export default JobFeed;
