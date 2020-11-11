import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { companies } from "../../../config";

import { setFilter } from "../../../reducers/filter";

const Menu = () => {
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.jobs.data);
  const selected = useSelector((state) => state.filters.company);

  return (
    <Container>
      <Companies>
        {companies
          .sort((a, b) => a.localeCompare(b))
          .map((option, i) => {
            const count = jobs.filter((job) => job.company === option).length;
            const active = selected.includes(option);
            return (
              <Company
                key={i}
                onClick={() => dispatch(setFilter("company", option))}
                active={active}
              >
                <Status count={count}>&bull;</Status>
                {option} {count}
              </Company>
            );
          })}
      </Companies>
    </Container>
  );
};

const Container = styled.div``;

const Companies = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Company = styled.div`
  margin: 4px;
  padding: 12px;
  font-size: 14px;
  border-radius: 4px;
  color: ${({ active }) => (active ? "#FFFFFF" : "inherit")};
  background: ${({ active }) => (active ? "#5A67D8" : "none")};
  &:hover {
    cursor: pointer;
  }
`;

const Status = styled.span`
  margin-right: 4px;
  color: ${({ count }) => (count === 0 ? "#E53E3E" : "#48BB78")};
  font-size: 18px;
`;

export default Menu;