import React from "react";
import styled from "styled-components";

import { ButtonClear, Icon } from "../../common";
import Search from "./Search";

const JobMenu = ({ jobs, toggle }) => (
  <Container>
    <Search jobs={jobs} />
    <ButtonClear
      onClick={toggle}
      margin="0 0 0 8px"
      color="#4a5568"
      size="22px"
    >
      <Icon icon={["fal", "sliders-h"]} />
    </ButtonClear>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25em;
  border-bottom: 1px solid #edf2f7;
`;

export default JobMenu;
