import React from "react";
import { Marker as MapMarker } from "@urbica/react-map-gl";
import styled from "styled-components";

const Marker = ({ longitude, latitude, pointCount }) => {
  const count = pointCount ? pointCount : 1;
  return (
    <MapMarker longitude={longitude} latitude={latitude}>
      <Circle count={count}>{count}</Circle>
    </MapMarker>
  );
};

const Circle = styled.div((props) => generateStyles(props.count));

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#ffffff",
  borderRadius: "100%",
  fontFamily: "Inter, sans-serif",
  fontWeight: "700",
};

const generateStyles = (pointCount) => {
  let size, background;
  if (pointCount >= 250) {
    size = 100;
    background = "#EF4444";
  } else if (pointCount < 250 && pointCount >= 100) {
    size = 80;
    background = "#F59E0B";
  } else if (pointCount < 100 && pointCount >= 50) {
    size = 60;
    background = "#10B981";
  } else if (pointCount < 50 && pointCount >= 25) {
    size = 40;
    background = "#3B82F6";
  } else {
    size = 20;
    background = "#6366F1";
  }
  return {
    ...style,
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size / 3 + 4}px`,
    background,
  };
};

export default Marker;
