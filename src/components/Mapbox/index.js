import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import styled from "styled-components";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Mapbox = ({ width, height, jobs }) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 37,
    longitude: -95,
    zoom: 3
  });

  return (
    <Container width={width} height={height}>
      <ReactMapGL
        {...viewport}
        onViewportChange={viewport => setViewport(viewport)}
        mapboxApiAccessToken={TOKEN}
      >
        {jobs.map(job =>
          job.coords ? (
            <Marker latitude={job.coords.lat} longitude={job.coords.lng}>
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
  width: ${props => props.width};
  height: ${props => props.height};
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
