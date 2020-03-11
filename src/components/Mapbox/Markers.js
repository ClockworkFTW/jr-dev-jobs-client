import React from "react";
import { Marker } from "react-map-gl";
import styled from "styled-components";

export const Markers = ({ jobs }) =>
  jobs.map((job, i) =>
    job.coords ? (
      <Marker key={i} latitude={job.coords.lat} longitude={job.coords.lng}>
        <Logo src={job.logo} />
      </Marker>
    ) : null
  );

const Logo = styled.img`
  width: 50px;
  height: 50px;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: #ffffff;
`;
