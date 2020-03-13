import React, { useState } from "react";
import styled from "styled-components";

import { companies } from "../../../config";

import { Icon } from "../../common";

export const FilterCompany = ({ company, setCompany }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = option => {
    setCompany("company", option);
    setShowOptions(false);
  };

  return (
    <Container>
      <Active onClick={() => setShowOptions(!showOptions)}>
        {company}
        <Icon icon={["fal", "sort"]} />
      </Active>
      {showOptions && (
        <Options>
          {companies.map((option, i) => (
            <Option key={i} onClick={() => handleSelect(option)}>
              {option}
            </Option>
          ))}
        </Options>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  flex: 0 0 160px;
  margin: 0 8px 0 16px;
  font-size: 14px;
`;

const Active = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
`;

const Options = styled.ul`
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 46px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const Option = styled.li`
  padding: 12px;
  &:hover {
    cursor: pointer;
  }
`;
