import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import styled from "styled-components";

import { Alert } from "./Alert";
import { Markers } from "./Markers";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Mapbox = ({ jobs, position }) => {
  const [viewport, setViewport] = useState({
    latitude: 37,
    longitude: -95,
    zoom: 3
  });

  const onViewportChange = viewport => {
    const { width, height, ...etc } = viewport;
    setViewport(etc);
  };

  return (
    <Container>
      <Alert position={position} />
      <ReactMapGL
        width="100%"
        height="100%"
        {...viewport}
        onViewportChange={viewport => onViewportChange(viewport)}
        mapboxApiAccessToken={TOKEN}
      >
        <Markers jobs={jobs} />
      </ReactMapGL>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  float: right;
  width: calc(100vw - 600px);
  height: 100vh;
  @media (max-width: 900px) {
    display: none;
  }
`;

export default Mapbox;
