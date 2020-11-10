import React from "react";
import styled from "styled-components";

const Status = ({ pending, error }) =>
  pending || error ? (
    <Wrapper>
      <Container>
        <Message>{error ? "Error" : "Loading..."}</Message>
      </Container>
    </Wrapper>
  ) : null;

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

export default Status;
