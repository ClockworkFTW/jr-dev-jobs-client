import React from "react";

import { Tag } from "../../common";

const Rating = ({ reviews }) => {
  const rating = Math.round((reviews[0][1] / 5) * 100);

  let background, color;

  if (rating >= 90) {
    background = "#BEE3F8";
    color = "#3182CE";
  } else if (rating < 90 && rating >= 75) {
    background = "#C6F6D5";
    color = "#38A169";
  } else if (rating < 75 && rating >= 50) {
    background = "#FEFCBF";
    color = "#D69E2E";
  } else if (rating < 50 && rating >= 35) {
    background = "#FEEBC8";
    color = "#DD6B20";
  } else {
    background = "#FED7D7";
    color = "#E53E3E";
  }

  return (
    <Tag background={background} color={color}>
      {rating}/100
    </Tag>
  );
};

export default Rating;
