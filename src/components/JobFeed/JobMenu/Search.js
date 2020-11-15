import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setFilter } from "../../../reducers/filter";

import { Icon } from "../../common";

const Search = ({ jobs }) => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.filters);
  return (
    <Container>
      <Icon fontSize="18px" icon={["fal", "search"]} />
      <Input
        type="text"
        placeholder={`Search ${jobs.length} jobs`}
        value={search}
        onChange={(e) => dispatch(setFilter("search", e.target.value))}
      />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-betwen;
  align-items: center;
  padding: 0.625em;
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
  font-size: 0.875em;
  color: #2d3748;
  text-transform: capitalize;
  background: #edf2f7;
  &::placeholder {
    text-transform: none;
    color: #718096;
  }
`;

export default Search;
