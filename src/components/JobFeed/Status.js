import React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";

const Status = ({ pending, error }) =>
  pending || error ? (
    <Container>
      {[...Array(10)].map((e, i) => (
        <Loader
          key={i}
          viewBox="0 0 380 70"
          backgroundColor="#edf2f7"
          foregroundColor="#f7fafc"
        >
          {/* Only SVG shapes */}
          <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
          <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
          <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
        </Loader>
      ))}
    </Container>
  ) : null;

const Container = styled.div`
  padding: 20px;
`;

const Loader = styled(ContentLoader)`
  margin-bottom: 20px;
`;

export default Status;
