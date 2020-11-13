import React from "react";
import moment from "moment";
import styled from "styled-components";

import { H1, H3 } from "../../common";
import Rating from "./Rating";
import Technologies from "../JobView/Technologies";

const Job = ({ job, setJob }) => (
  <Container favorite={job.favorite} onClick={() => setJob(job)}>
    <Side>
      <Logo src={job.logo} alt={`${job.company} logo`} />
      <Rating reviews={job.reviews} />
    </Side>
    <Main>
      <H1 color="#a0aec0">{job.company}</H1>
      <Banner>
        <Title style={{ flex: "0 0 70%" }}>{job.title}</Title>
        <Salary>
          <span style={{ color: "#5A67D8" }}>
            {job.salary[0].Base} - {job.salary[0].Total}
          </span>{" "}
          USD
        </Salary>
      </Banner>
      <Banner>
        <H3>{job.location}</H3>
        <H3>{moment(job.time).fromNow()}</H3>
      </Banner>
      <Technologies listing={job.listing} />
    </Main>
  </Container>
);

const Container = styled.li`
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 1.25em;
  border: 1px solid ${(props) => (props.favorite ? "#D69E2E" : "#edf2f7")};
  border-radius: 8px;
  background: ${(props) => (props.favorite ? "#FAF089" : "#ffffff")};
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

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
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

export default Job;
