import React from "react";
import styled from "styled-components";

const Technologies = ({ technologies, basic }) => (
  <Container>
    {technologies
      .sort((a, b) => b[1] - a[1])
      .map((technology, i) => {
        const name = technology[0];
        const count = technology[1];

        let background, color;

        switch (count) {
          case 1:
            background = "#BEE3F8";
            color = "#3182CE";
            break;
          case 2:
            background = "#C6F6D5";
            color = "#38A169";
            break;
          case 3:
            background = "#FEFCBF";
            color = "#D69E2E";
            break;
          case 4:
            background = "#FEEBC8";
            color = "#DD6B20";
            break;
          default:
            background = "#FED7D7";
            color = "#E53E3E";
            break;
        }

        return (
          <Technology
            key={i}
            basic={basic}
            color={color}
            background={background}
          >
            {basic ? null : <span style={{ marginRight: "4px" }}>{count}</span>}
            {name}
          </Technology>
        );
      })}
  </Container>
);

const Container = styled.ul``;

const Technology = styled.li`
  display: inline-block;
  margin: 0 0.5em 0.5em 0;
  padding: 0.5em 0.875em;
  background: ${({ basic, background }) => (basic ? "#edf2f7" : background)};
  color: ${({ basic, color }) => (basic ? "#718096" : color)};
  font-size: 0.75em;
  font-weight: 700;
  border-radius: 4px;
`;

export default Technologies;
