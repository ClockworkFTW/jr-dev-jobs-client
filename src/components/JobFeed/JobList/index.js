import React from "react";
import moment from "moment";
import styled from "styled-components";

import { Banner, Tag, Icon, H1, H3 } from "../../common";
import Rating from "./Rating";
import Technologies from "../JobView/Technologies";

const JobList = ({ jobs, focusJob, selectJob }) => (
  <Wrapper>
    {jobs.map((job, i) => (
      <Container
        key={i}
        onClick={() => selectJob(job)}
        onMouseEnter={() => focusJob(job)}
        onMouseLeave={() => focusJob(null)}
      >
        <Side>
          <Logo src={job.logo} alt={`${job.company} logo`} />
          <Rating reviews={job.reviews} />
        </Side>
        <Main>
          <Banner justify="left">
            <Company>{job.company}</Company>
            {job.applied && (
              <Tag background="#C3DAFE" color="#5A67D8">
                <Icon icon={["fas", "star"]} margin="0 4px 0 0" />
                Applied
              </Tag>
            )}
          </Banner>
          <Banner>
            <Title>{job.title}</Title>
            <Salary>
              <span style={{ color: "#5A67D8" }}>
                {job.salary[0].Base} - {job.salary[0].Total}
              </span>{" "}
              USD
            </Salary>
          </Banner>
          <Banner>
            <H3>{job.address}</H3>
            <H3>{moment(job.time).fromNow()}</H3>
          </Banner>
          <Technologies technologies={job.technologies} basic={true} />
        </Main>
      </Container>
    ))}
  </Wrapper>
);

const Wrapper = styled.ul`
  padding: 20px;
  @media (max-width: 900px) {
    padding: 0;
  }
`;

const Container = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 1.25em;
  border: 1px solid ${(props) => (props.applied ? "#D69E2E" : "#edf2f7")};
  border-radius: 8px;
  background: ${(props) => (props.applied ? "#FAF089" : "#ffffff")};
  transition: all 0.2s ease-in-out;
  &:nth-child(1) {
    margin-top: 0;
  }
  &:nth-last-child(1) {
    margin-bottom: 0;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    ::before {
      position: absolute;
      right: -3px;
      content: "";
      width: 5px;
      height: 60%;
      background: #5a67d8;
      border-radius: 5px;
    }
    ::after {
      position: absolute;
      left: -3px;
      content: "";
      width: 5px;
      height: 60%;
      background: #5a67d8;
      border-radius: 5px;
    }
  }
  @media (max-width: 900px) {
    margin: 0;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid #edf2f7;
    border-radius: 0;
  }
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.25em; ;
`;

const Logo = styled.img`
  margin-bottom: 0.625em;
  width: 3.75em;
  height: 3.75em;
`;

const Main = styled.div`
  flex: 1;
`;

const Company = styled(H1)`
  color: #a0aec0;
  margin-right: 8px;
`;

const Title = styled(H1)`
  flex: 0 0 70%;
  @media (max-width: 900px) {
    flex: 0 0 100% !important;
  }
`;

const Salary = styled(H3)`
  font-weight: 700;
  @media (max-width: 900px) {
    display: none;
  }
`;

export default JobList;
