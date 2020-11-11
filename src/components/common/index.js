import "reset-css";
import styled, { createGlobalStyle } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fal, faStar);

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    @media (max-width: 900px) {
      font-size: 14px;
    }
  }
  *, *:before, *:after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  margin: ${({ margin }) => margin};
`;

export const Tag = styled.div`
  padding: 0.5em 0.875em;
  border-radius: 4px;
  font-size: 0.75em;
  font-weight: 700;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
`;

export const H1 = styled.h1`
  line-height: 1.25;
  font-weight: 700;
  font-size: 1em;
  color: ${({ color }) => (color ? color : "#2d3748")};
`;

export const H3 = styled.h3`
  font-size: 0.875em;
  color: ${({ color }) => (color ? color : "#a0aec0")};
`;
