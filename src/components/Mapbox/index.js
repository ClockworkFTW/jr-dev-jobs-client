import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactMapGL, { FlyToInterpolator } from "react-map-gl";

import { reduceJobs } from "../../util";
import { Markers } from "./Markers";
const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Mapbox = () => {
  // prettier-ignore
  const jobs = useSelector((state) => reduceJobs(state).filter((job) => job.coordinates));
  const job = useSelector((state) => state.job);

  // Set initial viewport state centered on US
  const INITIAL_STATE = {
    latitude: 37,
    longitude: -95,
    zoom: 3.5,
  };
  const [viewport, setViewport] = useState(INITIAL_STATE);

  // Handle viewport changes
  const onViewportChange = (viewport) => {
    const { width, height, ...etc } = viewport;
    setViewport(etc);
  };

  // Fly to location when job is selected
  useEffect(() => {
    if (job && job.coordinates) {
      setViewport({
        latitude: job.coordinates.lat,
        longitude: job.coordinates.lng,
        zoom: 12,
        transitionDuration: "auto",
        transitionInterpolator: new FlyToInterpolator(),
      });
    } else {
      setViewport({
        ...INITIAL_STATE,
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  }, [job]);

  return (
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
  );
};

export default Mapbox;
