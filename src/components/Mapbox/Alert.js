import React from "react";
import styled from "styled-components";

import { Icon } from "../common";

export const Alert = ({ position }) =>
  !position ? (
    <Container>
      <Icon icon={["fal", "exclamation-triangle"]} />
      <Text>Please allow location services for accurate sorting</Text>
    </Container>
  ) : null;

const Container = styled.div`
  z-index: 1;
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #edf2f7;
  font-size: 18px;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Text = styled.span`
  margin-left: 8px;
  font-size: 14px;
`;
