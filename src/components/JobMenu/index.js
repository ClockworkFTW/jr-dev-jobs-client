import React from "react";
import styled from "styled-components";

import { companies } from "../../config";
import { Count } from "./Count";
import { Search } from "./Search";
import { Select } from "./Select";
import { Remote } from "./Remote";

const JobMenu = props => {
  const {
    count,
    search,
    setSearch,
    company,
    setCompany,
    remote,
    setRemote
  } = props;

  return (
    <Container>
      <Count count={count} />
      <Search search={search} setSearch={setSearch} />
      <Select options={companies} value={company} setValue={setCompany} />
      <Remote remote={remote} setRemote={setRemote} />
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

const Input = styled.input`
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  background: #edf2f7;
`;

export default JobMenu;
