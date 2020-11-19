import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import mapboxgl from "mapbox-gl";
import MapboxglSpiderifier from "mapboxgl-spiderifier";

import "./index.css";
import mapboxConfig from "./config";
import { setViewing } from "../../reducers/job";
import { reduceJobs } from "../../util";
import Popup from "./Popup";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Mapbox = () => {
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const popUpRef = useRef(
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 15 })
  );

  useEffect(() => {
    // Create map instance
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-95, 37],
      zoom: 3.5,
    });

    // Create spiderifier instance
    const spiderifier = new MapboxglSpiderifier(map, {
      animate: true,
      animationSpeed: 200,

      // Set viewing on click
      onClick: (e, spiderLeg) => dispatch(setViewing(spiderLeg.feature)),

      // Handle popups
      initializeLeg: (spiderLeg) => {
        let popup;
        const pinElem = spiderLeg.elements.pin;
        const feature = spiderLeg.feature;
        const popupNode = document.createElement("div");
        ReactDOM.render(<Popup feature={feature} />, popupNode);

        // Add popup on mouse enter
        pinElem.addEventListener("mouseenter", () => {
          popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: MapboxglSpiderifier.popupOffsetForSpiderLeg(spiderLeg, 30),
          });
          popup.setDOMContent(popupNode).addTo(map);
          spiderLeg.mapboxMarker.setPopup(popup);
        });

        // Remove popup on mouse leave
        pinElem.addEventListener("mouseleave", () => {
          if (popup) {
            popup.remove();
          }
        });
      },
    });

    // Add map source and layers on load
    map.on("load", () => {
      map.addSource("job-data", mapboxConfig.jobData);
      map.addLayer(mapboxConfig.clusters);
      map.addLayer(mapboxConfig.clusterCount);
      map.addLayer(mapboxConfig.jobLayer);
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
        const coordinates = features[0].geometry.coordinates;
        const clusterId = features[0].properties.cluster_id;
        const pointCount = features[0].properties.point_count;
        const clusterSource = map.getSource("job-data");

        clusterSource.getClusterLeaves(
          clusterId,
          pointCount,
          0,
          (error, features) => {
            if (error) {
              return;
            } else {
              const markers = features.map((e) => e.properties);
              spiderifier.spiderfy(coordinates, markers);
            }
          }
        );
      }
    });

    // Change cursor to pointer when hovering over clusters
    map.on("mousemove", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      map.getCanvas().style.cursor = features.length ? "pointer" : "";
    });

    // Set viewing job on click
    map.on("click", "job-layer", (e) => {
      if (e.features.length) {
        const { properties } = e.features[0];
        let job = {
          ...properties,
          coordinates: JSON.parse(properties.coordinates),
          reviews: JSON.parse(properties.reviews),
          salary: JSON.parse(properties.salary),
          technologies: JSON.parse(properties.technologies),
        };

        dispatch(setViewing(job));
      }
    });

    // Add popup to non cluster on hover
    map.on("mouseenter", "job-layer", (e) => {
      const { properties, geometry } = e.features[0];
      let job = {
        ...properties,
        coordinates: JSON.parse(properties.coordinates),
        reviews: JSON.parse(properties.reviews),
        salary: JSON.parse(properties.salary),
        technologies: JSON.parse(properties.technologies),
      };

      // create popup node
      const popupNode = document.createElement("div");
      ReactDOM.render(<Popup feature={job} />, popupNode);
      // set popup on map
      popUpRef.current
        .setLngLat(geometry.coordinates)
        .setDOMContent(popupNode)
        .addTo(map);
    });

    // Remove popup from non cluster on hover
    map.on("mouseleave", "job-layer", (e) => {
      popUpRef.current.remove();
    });

    // Remove map after component unmounts
    return () => map.remove();
  }, []);

  // Get job data from redux, convert to geoJSON and add to map source
  const jobs = useSelector((state) => ({
    type: "FeatureCollection",
    features: reduceJobs(state)
      .filter((job) => job.coordinates)
      .map((job) => ({
        type: "Feature",
        properties: { ...job },
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

  // Handle flyto on job select
  const job = useSelector((state) => state.job);

  useEffect(() => {
    // Zoom in
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
      }
      // Zoom out
      else {
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
