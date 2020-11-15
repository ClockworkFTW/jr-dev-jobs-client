import React from "react";
import { Marker } from "react-map-gl";
import styled from "styled-components";

export const Markers = ({ jobs }) =>
  jobs.map((job, i) => (
    <Marker
      key={i}
      latitude={job.coordinates.lat}
      longitude={job.coordinates.lng}
    >
      <Logo src={job.logo} highlighted={job.highlighted} />
    </Marker>
  ));

const Logo = styled.img`
  width: ${({ highlighted }) => (highlighted ? "100px" : "50px")};
  height: ${({ highlighted }) => (highlighted ? "100px" : "50px")};
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: #ffffff;
  transition: all 0.2s ease-in-out;
`;
