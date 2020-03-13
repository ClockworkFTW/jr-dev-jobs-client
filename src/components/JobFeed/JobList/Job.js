import React from "react";
import moment from "moment";
import styled from "styled-components";

import { Icon } from "../../common";

export const Job = ({ job, flyTo, setFavorite }) => (
  <Container favorite={job.favorite}>
    <Logo
      src={job.logo}
      alt={`${job.company} logo`}
      onClick={() => flyTo(job.coords)}
    />
    <Content>
      <Banner>
        <Company>{job.company}</Company>
        <Favorite
          type="button"
          favorite={job.favorite}
          onClick={() => setFavorite(job.id)}
        >
          <Icon icon={["fal", "star"]} />
        </Favorite>
      </Banner>
      <Title href={job.link} target="_blank" rel="noopener noreferrer">
        {job.title}
      </Title>
      <Banner>
        <MetaData favorite={job.favorite}>
          <Icon
            style={{ marginRight: "6px" }}
            icon={["fal", job.coords ? "map-marker" : "globe"]}
          />
          {job.location}
        </MetaData>
        <MetaData favorite={job.favorite}>
          <Icon style={{ marginRight: "6px" }} icon={["fal", "clock"]} />
          {moment(job.time).fromNow()}
        </MetaData>
      </Banner>
    </Content>
  </Container>
);

const Container = styled.li`
  display: flex;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid ${props => (props.favorite ? "#D69E2E" : "#edf2f7")};
  border-radius: 8px;
  background: ${props => (props.favorite ? "#FAF089" : "#ffffff")};
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const Logo = styled.img`
  flex: 0;
  width: 80px;
  height: 80px;
  margin-right: 20px;
  @media (max-width: 900px) {
    display: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Company = styled.h2`
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 16px;
  color: #4a5568;
`;

const Favorite = styled.button`
  padding: 0;
  border: none;
  background: none;
  outline: none;
  font-size: 20px;
  color: ${props => (props.favorite ? "#D69E2E" : "#718096")};
  &:hover {
    color: #d69f2e;
    cursor: pointer;
  }
`;

const Title = styled.a`
  display: block;
  margin: 6px 30px 16px 0;
  text-decoration: none;
  line-height: 28px;
  font-weight: 700;
  font-size: 22px;
  color: #2d3748;
  &:hover {
    color: #667eea;
  }
`;

const MetaData = styled.h3`
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 200;
  color: ${props => (props.favorite ? "#D69E2E" : "#a0aec0")};
`;
