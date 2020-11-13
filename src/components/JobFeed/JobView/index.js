import React from "react";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import styled from "styled-components";

import "./index.css";
import { Icon, H1, H3 } from "../../common";
import Salary from "./Salary";
import Reviews from "./Reviews";
import Technologies from "./Technologies";

const JobView = ({ job, setJob }) => (
  <Container>
    <Header>
      <Logo src={job.logo} />
      <Content>
        <Banner>
          <Button onClick={() => setJob(null)}>
            <H1 color="#a0aec0">
              <Icon icon={["fas", "long-arrow-left"]} /> {job.company}
            </H1>
          </Button>
          <Link href={job.link} target="_blank">
            Apply
          </Link>
        </Banner>
        <Title>{job.title}</Title>
        <Banner>
          <H3>{job.location}</H3>
          <H3>{moment(job.time).fromNow()}</H3>
        </Banner>
      </Content>
    </Header>
    <Section>
      <Group>
        <Column>
          <Heading>company reviews</Heading>
          <Reviews reviews={job.reviews} />
        </Column>
        <Column>
          <Heading>tech requirements</Heading>
          <Technologies listing={job.listing} />
        </Column>
      </Group>
    </Section>
    <Section>
      <Heading>salary levels</Heading>
      <Salary salary={job.salary} />
    </Section>
    <Section>
      <Heading>job listing</Heading>
      <Listing className="listing">{ReactHtmlParser(job.listing)}</Listing>
    </Section>
  </Container>
);

const Container = styled.div`
  padding: 1.25em;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 1.25em;
  border-bottom: 1px solid #edf2f7;
`;

const Logo = styled.img`
  flex: 0;
  width: 80px;
  height: 80px;
  margin-right: 1.25em;
  @media (max-width: 900px) {
    display: none;
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

const Button = styled.button`
  display: flex;
  background: none;
  outline: none;
  border: none;
  font-size: inherit;
  &:hover {
    cursor: pointer;
  }
`;

const Link = styled.a`
  padding: 6px 12px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  background: #5a67d8;
  color: #ffffff;
  border-radius: 4px;
`;

const Title = styled.h1`
  margin: 6px 0 12px 0;
  line-height: 28px;
  font-weight: 700;
  font-size: 22px;
  color: #2d3748;
`;

const MetaData = styled.h3`
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 200;
  color: #a0aec0;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Group = styled.div`
  display: flex;
  @media (max-width: 900px) {
    display: block;
  }
`;

const Column = styled.div`
  flex: 0 0 50%;
  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 30px;
  }
`;

const Heading = styled.h3`
  margin-bottom: 16px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  color: #a0aec0;
`;

const Listing = styled.div``;

export default JobView;
