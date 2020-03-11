import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";
import styled from "styled-components";

export const Count = ({ count }) => {
  const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevCount = usePrevious(count);

  return (
    <Container>
      <CountUp start={prevCount} end={count} />
      <Text>Jr Dev Jobs</Text>
    </Container>
  );
};

const Container = styled.div`
  flex: 0 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 34px;
  font-weight: 700;
  color: #5a67d8;
`;

const Text = styled.span`
  margin-right: 4px;
  font-size: 12px;
  font-weight: 500;
`;
