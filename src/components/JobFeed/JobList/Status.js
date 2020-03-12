import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const Status = ({ pending, error }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return pending || !ready ? (
    <Wrapper>
      <Container>
        <Message>{error ? "Error" : "Loading..."}</Message>
      </Container>
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
`;

const Container = styled.div`
  text-align: center;
`;

const Message = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
`;
