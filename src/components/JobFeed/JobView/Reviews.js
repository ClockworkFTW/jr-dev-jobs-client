import React from "react";
import styled from "styled-components";

import { Icon } from "../../common";

const Reviews = ({ reviews }) => (
  <Container>
    {reviews.map((review) => (
      <Review>
        <Rating>
          <Text>{review[1]}</Text>
          <Icon icon={["fal", "star"]} />
        </Rating>
        <Category>{review[0]}</Category>
      </Review>
    ))}
  </Container>
);

const Container = styled.ul`
  font-size: 14px;
`;

const Review = styled.li`
  margin-bottom: 10px;
  color: #1a202c;
`;

const Rating = styled.span`
  margin-right: 8px;
  font-weight: 700;
  color: #f6e05e;
`;

const Text = styled.span`
  margin-right: 4px;
  color: #1a202c;
`;

const Category = styled.span``;

export default Reviews;
