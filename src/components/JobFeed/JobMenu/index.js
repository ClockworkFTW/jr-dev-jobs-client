import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { setFilter } from "../../../reducers/filter";

import { Count } from "./Count";
import { Search } from "./Search";
import { Company } from "./Company";
import { Remote } from "./Remote";

const JobMenu = ({ count, filters, setFilter }) => {
  const { search, company, remote } = filters;
  return (
    <Container>
      <Count count={count} />
      <Search search={search} setSearch={setFilter} />
      <Company company={company} setCompany={setFilter} />
      <Remote remote={remote} setRemote={setFilter} />
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
  filters: state.filters,
  count: state.jobs.data.length
});

export default connect(mapStateToProps, { setFilter })(JobMenu);
