import React from "react";
import { useSelector } from "react-redux";
import { Popup as MapboxPopup } from "@urbica/react-map-gl";
import styled from "styled-components";

import { H1, H3 } from "../common";

const Popup = () => {
  const job = useSelector((state) => state.jobSelected || state.jobFocused);

  return job ? (
    <MapboxPopup
      longitude={job.coordinates.lng}
      latitude={job.coordinates.lat}
      closeButton={false}
      closeOnClick={false}
    >
      <Container id={`popup-${job.id}`}>
        <Side>
          <Logo src={job.logo} />
        </Side>
        <Content>
          <H3>{job.company}</H3>
          <H1>{job.title}</H1>
          <H3>{job.location}</H3>
        </Content>
      </Container>
    </MapboxPopup>
  ) : null;
};

const Container = styled.div`
  display: flex;
  align-items: center;
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
