import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactMapGL, { FlyToInterpolator } from "react-map-gl";
import styled from "styled-components";

import { reduceJobs } from "../../util";

import { Alert } from "./Alert";
import { Markers } from "./Markers";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Mapbox = () => {
  const jobs = useSelector((state) => reduceJobs(state)).filter(
    (job) => job.coordinates
  );
  const { location } = useSelector((state) => state);
  const { latitude, longitude, zoom } = useSelector((state) => state.map);

  const [viewport, setViewport] = useState({
    latitude: 37,
    longitude: -95,
    zoom: 3.5,
  });

  useEffect(() => {
    if (latitude && longitude && zoom) {
      setViewport({
        latitude,
        longitude,
        zoom,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  }, [latitude, longitude, zoom]);

  const onViewportChange = (viewport) => {
    const { width, height, ...etc } = viewport;
    setViewport(etc);
  };

  return (
    <Container>
      <Alert location={location} />
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/light-v10"
        width="100%"
        height="100%"
        {...viewport}
        onViewportChange={(viewport) => onViewportChange(viewport)}
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
  background: #f6f6f4;
  @media (max-width: 900px) {
    display: none;
  }
`;

export default Mapbox;
