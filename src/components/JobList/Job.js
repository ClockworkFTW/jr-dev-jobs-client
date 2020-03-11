import React from "react";
import styled from "styled-components";

import { Icon } from "../common";

export const Job = ({ job }) => (
  <Container>
    <Link href={job.link}>
      <Logo src={job.logo} alt={`${job.company} logo`} />
      <Content>
        <Company>{job.company}</Company>
        <Title>{job.title}</Title>
        <Location>{job.location}</Location>
      </Content>
      <Button type="text">
        <Icon icon={["fal", "location"]} />
      </Button>
    </Link>
  </Container>
);

const Container = styled.li`
  margin-bottom: 20px;
  border: 1px solid #edf2f7;
  border-radius: 8px;
  background: #ffffff;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const Link = styled.a`
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
  margin-left: 20px;
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

const Button = styled.button``;
