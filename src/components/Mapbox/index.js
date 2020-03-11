import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import styled from "styled-components";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Mapbox = ({ width, height, jobs }) => {
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
    <Container width={width} height={height}>
      <ReactMapGL
        width="100%"
        height="100%"
        {...viewport}
        onViewportChange={viewport => onViewportChange(viewport)}
        mapboxApiAccessToken={TOKEN}
      >
        {jobs.map((job, i) =>
          job.coords ? (
            <Marker
              key={i}
              latitude={job.coords.lat}
              longitude={job.coords.lng}
            >
              <MarkerLogo src={job.logo} />
            </Marker>
          ) : null
        )}
      </ReactMapGL>
    </Container>
  );
};

const Container = styled.div`
  float: right;
  width: calc(100vw - 600px);
  height: 100vh;
`;

const MarkerLogo = styled.img`
  width: 50px;
  height: 50px;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: #ffffff;
`;

export default Mapbox;
