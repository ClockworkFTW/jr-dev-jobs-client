import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { setFilter } from "../../../reducers/filter";

import { FilterSearch } from "./FilterSearch";
import { FilterCompany } from "./FilterCompany";
import { FilterButton } from "./FilterButton";

const JobMenu = ({ filters, setFilter }) => {
  const { search, company, remote, favorite } = filters;
  return (
    <Container>
      <FilterSearch search={search} setSearch={setFilter} />
      <FilterCompany company={company} setCompany={setFilter} />
      <FilterButton
        filter={remote}
        name="remote"
        icon="globe"
        setFilter={setFilter}
      />
      <FilterButton
        filter={favorite}
        name="favorite"
        icon="star"
        setFilter={setFilter}
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

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps, { setFilter })(JobMenu);
