import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { setFilter } from "../../../reducers/filter";

import { FilterSearch } from "./FilterSearch";
import { FilterCompany } from "./FilterCompany";
import { FilterButton } from "./FilterButton";

const JobMenu = () => {
  const dispatch = useDispatch();
  const setJobFilter = (prop, val) => dispatch(setFilter(prop, val));
  const { search, company, remote, favorite } = useSelector(
    (state) => state.filters
  );

  return (
    <Container>
      <FilterSearch search={search} setSearch={setJobFilter} />
      <FilterCompany company={company} setCompany={setJobFilter} />
      <FilterButton
        filter={remote}
        name="remote"
        icon="globe"
        setFilter={setJobFilter}
      />
      <FilterButton
        filter={favorite}
        name="favorite"
        icon="star"
        setFilter={setJobFilter}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #edf2f7;
`;

export default JobMenu;
