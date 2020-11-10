import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";
import styled from "styled-components";

export const Count = ({ count }) => {
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevCount = usePrevious(count);

  return (
    <Container>
      <Text>Results:</Text>
      <CountUp start={prevCount} end={count} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  color: #718096;
`;

const Text = styled.span`
  margin-right: 4px;
`;
