import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MapGL from "@urbica/react-map-gl";
import Cluster from "@urbica/react-map-gl-cluster";
import "mapbox-gl/dist/mapbox-gl.css";

import { reduceJobs } from "../../util";
import Marker from "./Marker";
import Popup from "./Popup";

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

// Initial viewport centered on US
const INITIAL_STATE = {
  latitude: 39.5,
  longitude: -98.35,
  zoom: 3.5,
};

// Create geojson object from job
const GEOJSON = (job) => ({
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [job.coordinates.lng, job.coordinates.lat],
  },
  properties: {
    ...job,
  },
});

const Map = () => {
  const [viewport, setViewport] = useState(INITIAL_STATE);

  const jobSelected = useSelector((state) => state.jobSelected);

  useEffect(() => {
    if (jobSelected) {
      const { lat, lng } = jobSelected.coordinates;
      setViewport({
        latitude: lat,
        longitude: lng,
        zoom: 11,
      });
    } else {
      setViewport(INITIAL_STATE);
    }
  }, [jobSelected]);

  const jobs = useSelector(reduceJobs)
    .filter((job) => job.coordinates)
    .map((job) => GEOJSON(job));

  return (
    <MapGL
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/light-v10"
      accessToken={MAPBOX_ACCESS_TOKEN}
      onViewportChange={setViewport}
      viewportChangeMethod="flyTo"
      {...viewport}
    >
      <Cluster component={Marker}>
        {jobs.map((point) => (
          <Marker
            key={point.properties.id}
            latitude={point.geometry.coordinates[1]}
            longitude={point.geometry.coordinates[0]}
          />
        ))}
      </Cluster>
      <Popup />
    </MapGL>
  );
};

export default Map;
