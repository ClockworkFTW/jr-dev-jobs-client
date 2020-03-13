import React from "react";
import styled from "styled-components";

import { Icon } from "../../common";

export const FilterButton = ({ filter, name, icon, setFilter }) => (
  <Button
    type="button"
    active={filter}
    onClick={() => setFilter(name, !filter)}
  >
    <Icon icon={["fal", icon]} />
  </Button>
);

const Button = styled.button`
  padding: 8px;
  outline: none;
  background: none;
  border: none;
  font-size: 22px;
  color: ${props => (props.active ? "#667EEA" : "#a0aec0")};
  &:hover {
    cursor: pointer;
  }
`;
