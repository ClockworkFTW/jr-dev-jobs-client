import React from "react";
import styled from "styled-components";

import { Icon } from "../../common";
import Search from "./Search";

const JobMenu = ({ jobs, toggle }) => (
  <Container>
    <Search jobs={jobs} />
    <Button onClick={toggle}>
      <Icon icon={["fal", "sliders-h"]} />
    </Button>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #edf2f7;
`;

const Button = styled.button`
  margin-left: 8px;
  font-size: 22px;
`;

export default JobMenu;
