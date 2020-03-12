import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactMapGL, { FlyToInterpolator } from "react-map-gl";
import styled from "styled-components";

import { Alert } from "./Alert";
import { Markers } from "./Markers";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Mapbox = ({ jobs, location, map }) => {
  const { latitude, longitude, zoom } = map;

  const [viewport, setViewport] = useState({
    latitude: 37,
    longitude: -95,
    zoom: 3.5
  });

  useEffect(() => {
    if (latitude && longitude && zoom) {
      setViewport({
        latitude,
        longitude,
        zoom,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator()
      });
    }
  }, [latitude, longitude, zoom]);

  const onViewportChange = viewport => {
    const { width, height, ...etc } = viewport;
    setViewport(etc);
  };

  const jobsWithCoords = jobs.filter(job => job.coords);

  return (
    <Container>
      <Alert location={location} />
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/light-v10"
        width="100%"
        height="100%"
        {...viewport}
        onViewportChange={viewport => onViewportChange(viewport)}
        mapboxApiAccessToken={TOKEN}
      >
        <Markers jobs={jobsWithCoords} />
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

const mapStateToProps = state => ({
  jobs: state.jobs.data,
  location: state.location.data,
  map: state.map
});

export default connect(mapStateToProps)(Mapbox);
