import React from "react";
import styled from "styled-components";

import { keywords } from "../../../config";

const Technologies = ({ listing }) => {
  const technologies = keywords.map((keyword) => {
    const regex = new RegExp(keyword, "g");
    const count = (listing.match(regex) || []).length;
    return [keyword, count];
  });

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
  margin: 0 8px 8px 0;
  padding: 6px 14px;
  background: #e6fffa;
  color: #38b2ac;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
`;

export default Technologies;
