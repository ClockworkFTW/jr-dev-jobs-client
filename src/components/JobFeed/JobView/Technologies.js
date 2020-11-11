import React from "react";
import styled from "styled-components";

import { keywords } from "../../../config";

const Technologies = ({ listing }) => {
  const technologies = listing
    ? keywords.map((keyword) => {
        const regex = new RegExp(keyword, "g");
        const count = (listing.match(regex) || []).length;
        return [keyword, count];
      })
    : [];

  return (
    <Container>
      {technologies.map((technology, i) =>
        technology[1] !== 0 ? (
          <Technology key={i}>{technology[0]}</Technology>
        ) : null
      )}
    </Container>
  );
};

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
