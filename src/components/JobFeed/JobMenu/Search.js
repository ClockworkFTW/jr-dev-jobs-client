import React from "react";
import styled from "styled-components";

import { Icon } from "../../common";

export const Search = ({ search, setSearch }) => (
  <Container>
    <Icon fontSize="18px" icon={["fal", "search"]} />
    <Input
      type="text"
      placeholder="Search job title"
      value={search}
      onChange={e => setSearch("search", e.target.value)}
    />
  </Container>
);

const Container = styled.div`
  flex: 0 0 200px;
  display: flex;
  justify-content: space-betwen;
  align-items: center;
  padding: 10px;
  background: #edf2f7;
  border-radius: 4px;
  color: #718096;
`;

const Input = styled.input`
  width: 100%;
  margin-left: 8px;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 14px;
  color: #2d3748;
  text-transform: capitalize;
  background: #edf2f7;
  &::placeholder {
    text-transform: none;
    color: #718096;
  }
`;
