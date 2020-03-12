import React from "react";
import styled from "styled-components";

import { Icon } from "../../common";

export const Remote = ({ remote, setRemote }) => (
  <Button
    type="button"
    active={remote}
    onClick={() => setRemote("remote", !remote)}
  >
    <Icon icon={["fal", "home-alt"]} />
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
