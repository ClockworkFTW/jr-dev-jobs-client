import React from "react";
import styled from "styled-components";

import { Icon } from "../../common";

export const Job = ({ job, flyTo, setFavorite }) => (
  <Container favorite={job.favorite}>
    <Link href={job.link}>
      <Logo src={job.logo} alt={`${job.company} logo`} />
      <Content>
        <Company>{job.company}</Company>
        <Title>{job.title}</Title>
        <Location>{job.location}</Location>
      </Content>
      <Buttons>
        <Button type="text" onClick={() => flyTo(job.coords)}>
          <Icon icon={["fal", "location"]} />
        </Button>
        <Button
          type="text"
          style={{ color: job.favorite ? "#D69E2E" : "#4A5568" }}
          onClick={() => setFavorite(job.id)}
        >
          <Icon icon={["fal", "star"]} />
        </Button>
      </Buttons>
    </Link>
  </Container>
);

const Container = styled.li`
  position: relative;
  margin-bottom: 20px;
  border: 1px solid ${props => (props.favorite ? "#D69E2E" : "#edf2f7")};
  border-radius: 8px;
  background: ${props => (props.favorite ? "#FAF089" : "#ffffff")};
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const Link = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  text-decoration: none;
`;

const Logo = styled.img`
  flex: 0;
  width: 80px;
  height: 80px;
`;

const Content = styled.div`
  flex: 1;
  margin: 0 40px 0 20px;
`;

const Company = styled.h2`
  font-weight: 700;
  font-size: 16px;
  color: #4a5568;
`;

const Title = styled.h1`
  margin: 8px 0;
  font-weight: 700;
  font-size: 22px;
  color: #2d3748;
`;

const Location = styled.h3`
  font-size: 14px;
  color: #a0aec0;
`;

const Buttons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 900px) {
    display: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  background: none;
  outline: none;
  font-size: 20px;
  &:hover {
    color: #48bb78;
    cursor: pointer;
  }
`;
