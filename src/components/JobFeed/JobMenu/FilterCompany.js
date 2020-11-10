import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { companies } from "../../../config";

import { Icon } from "../../common";

export const FilterCompany = ({ company, setCompany }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (option) => {
    setCompany("company", option);
    setShowOptions(false);
  };

  const jobs = useSelector((state) => state.jobs.data);

  return (
    <Container>
      <Active onClick={() => setShowOptions(!showOptions)}>
        {company}
        <Icon icon={["fal", "sort"]} />
      </Active>
      {showOptions && (
        <Options>
          {companies.map((option, i) => {
            const count = jobs.filter((job) => job.company === option).length;
            return (
              <Option key={i} onClick={() => handleSelect(option)}>
                <Status
                  count={option === "All companies" ? jobs.length : count}
                >
                  &bull;
                </Status>
                {option}{" "}
                {option === "All companies"
                  ? `(${jobs.length})`
                  : count === 0
                  ? null
                  : `(${count})`}
              </Option>
            );
          })}
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

const Status = styled.span`
  margin-right: 4px;
  color: ${({ count }) => (count === 0 ? "#E53E3E" : "#48BB78")};
  font-size: 18px;
`;
