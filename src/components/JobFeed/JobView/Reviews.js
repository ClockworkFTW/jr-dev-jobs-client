import React from "react";
import styled from "styled-components";

import { Icon } from "../../common";

const Reviews = ({ reviews }) => (
  <Container>
    {reviews.map((review, i) => (
      <Review key={i}>
        <Rating>{review[1]}</Rating>
        <Icon icon={["fas", "star"]} color="#f6e05e" />
        <Category>{review[0]}</Category>
      </Review>
    ))}
  </Container>
);

const Container = styled.ul`
  font-size: 0.875em;
`;

const Review = styled.li`
  margin-bottom: 10px;
  color: #1a202c;
`;

const Rating = styled.span`
  display: inline-block;
  width: 26px;
  font-weight: 700;
`;

const Category = styled.span`
  margin-left: 8px;
`;

export default Reviews;
