import { faEdit } from "@fortawesome/pro-light-svg-icons";
import React from "react";
import styled from "styled-components";

import { H1, H3 } from "../common";

const Popup = ({ feature }) => {
  const { id, title, company, logo, location } = feature;

  return (
    <Container id={`popup-${id}`}>
      <Side>
        <Logo src={logo} />
      </Side>
      <Content>
        <H3>{company}</H3>
        <H1>{title}</H1>
        <H3>{location}</H3>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Side = styled.div`
  flex: 0 0 40px;
  height: 40px;
  margin-right: 10px;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const Content = styled.div``;

export default Popup;
