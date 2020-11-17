import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import MapboxglSpiderifier from "mapboxgl-spiderifier";

import "./index.css";
import { reduceJobs } from "../../util";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Mapbox = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-95, 37],
      zoom: 3.5,
    });

    const spiderifier = new MapboxglSpiderifier(map, {
      animate: true,
      animationSpeed: 200,
      onClick: (e, marker) => {
        console.log(marker);
      },
    });

    map.on("load", () => {
      map.addSource("job-data", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "job-data",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#5a67d8",
          "circle-radius": ["step", ["get", "point_count"], 16, 25, 32, 50, 48],
          "circle-stroke-color": "white",
          "circle-stroke-width": 3,
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "job-data",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 14,
        },
        paint: {
          "text-color": "white",
        },
      });

      map.addLayer({
        id: "job-layer",
        type: "circle",
        source: "job-data",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#5a67d8",
          "circle-radius": 16,
          "circle-stroke-color": "white",
          "circle-stroke-width": 3,
        },
      });

      setMap(map);
    });

    // Spiderify cluster on click
    map.on("click", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      if (!features.length) {
        spiderifier.unspiderfy();
      } else {
        const { coordinates } = features[0].geometry;
        const { point_count } = features[0].properties;
        const markers = [...Array(point_count)].map((e, i) => ({
          id: i,
        }));
        spiderifier.spiderfy(coordinates, markers);
      }
    });

    // Change cursor to pointer when hovering over clusters
    map.on("mousemove", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      map.getCanvas().style.cursor = features.length ? "pointer" : "";
    });

    // Remove the map after the component unmounts
    return () => map.remove();
  }, []);

  // Add job data to map
  const jobs = useSelector((state) => ({
    type: "FeatureCollection",
    features: reduceJobs(state)
      .filter((job) => job.coordinates)
      .map((job) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [job.coordinates.lng, job.coordinates.lat],
        },
      })),
  }));

  useEffect(() => {
    if (map) {
      map.getSource("job-data").setData(jobs);
    }
  }, [jobs]);

  // Fly to location when job is selected
  const job = useSelector((state) => state.job);

  useEffect(() => {
    if (map) {
      if (job && job.coordinates) {
        map.flyTo({
          center: [job.coordinates.lng, job.coordinates.lat],
          zoom: 12,
          speed: 1.5,
          curve: 1,
          easing(t) {
            return t;
          },
        });
      } else {
        map.flyTo({
          center: [-95, 37],
          zoom: 3.5,
          speed: 1.5,
          curve: 1,
          easing(t) {
            return t;
          },
        });
      }
    }
  }, [job]);

  return <div ref={mapRef} />;
};

export default Mapbox;
