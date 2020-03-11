import React, { useState } from "react";
import styled from "styled-components";

import { Icon } from "../common";

export const Select = ({ options, value, setValue }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = option => {
    setValue(option);
    setShowOptions(false);
  };

  return (
    <Container>
      <Active onClick={() => setShowOptions(!showOptions)}>
        {value}
        <Icon icon={["fal", "sort"]} />
      </Active>
      {showOptions && (
        <Options>
          {options.map(option => (
            <Option onClick={() => handleSelect(option)}>{option}</Option>
          ))}
        </Options>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  flex: 0 0 160px;
  font-size: 14px;
`;

const Active = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
`;

const Options = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const Option = styled.li`
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;