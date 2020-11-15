import React from "react";
import styled from "styled-components";

const Technologies = ({ technologies }) =>
  technologies ? (
    <Container>
      {technologies.map((technology, i) => (
        <Technology key={i}>{technology[0]}</Technology>
      ))}
    </Container>
  ) : null;

const Container = styled.ul``;

const Technology = styled.li`
  display: inline-block;
  margin: 0 0.5em 0.5em 0;
  padding: 0.5em 0.875em;
  /* background: #e6fffa;
  color: #38b2ac; */
  background: #edf2f7;
  color: #718096;
  font-size: 0.75em;
  font-weight: 700;
  border-radius: 4px;
`;

export default Technologies;
