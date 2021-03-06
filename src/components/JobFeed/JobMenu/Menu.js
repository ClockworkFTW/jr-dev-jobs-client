import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { companies, keywords } from "../../../config";
import { setFilter } from "../../../reducers/filter";
import { setSort } from "../../../reducers/sort";
import { Banner, ButtonPrimary, Icon } from "../../common";

const Menu = () => {
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.jobs.data);
  const { company, technologies, applied, remote } = useSelector(
    (state) => state.filters
  );
  const { distance, rating, salary, time } = useSelector((state) => state.sort);

  return (
    <Container>
      <Banner>
        <div>
          <ButtonPrimary
            onClick={() => dispatch(setSort("time"))}
            active={time}
            margin="0 8px 8px 0"
          >
            {time && (
              <Icon
                icon={["fas", time === "asc" ? "sort-up" : "sort-down"]}
                margin="0 4px 0 0"
              />
            )}
            New
          </ButtonPrimary>
          <ButtonPrimary
            onClick={() => dispatch(setSort("distance"))}
            active={distance}
            margin="0 8px 8px 0"
          >
            {distance && (
              <Icon
                icon={["fas", distance === "asc" ? "sort-up" : "sort-down"]}
                margin="0 4px 0 0"
              />
            )}
            Distance
          </ButtonPrimary>
          <ButtonPrimary
            onClick={() => dispatch(setSort("rating"))}
            active={rating}
            margin="0 8px 8px 0"
          >
            {rating && (
              <Icon
                icon={["fas", rating === "asc" ? "sort-up" : "sort-down"]}
                margin="0 4px 0 0"
              />
            )}
            Rating
          </ButtonPrimary>
          <ButtonPrimary
            onClick={() => dispatch(setSort("salary"))}
            active={salary}
            margin="0 8px 8px 0"
          >
            {salary && (
              <Icon
                icon={["fas", salary === "asc" ? "sort-up" : "sort-down"]}
                margin="0 4px 0 0"
              />
            )}
            Salary
          </ButtonPrimary>
          <ButtonPrimary
            onClick={() => dispatch(setFilter("remote", !remote))}
            active={remote}
            margin="0 8px 8px 0"
          >
            Remote
          </ButtonPrimary>
          <ButtonPrimary
            onClick={() => dispatch(setFilter("applied", !applied))}
            active={applied}
            margin="0 8px 8px 0"
          >
            Applied
          </ButtonPrimary>
        </div>
        <ButtonPrimary onClick={() => dispatch(setFilter("reset"))}>
          Reset
        </ButtonPrimary>
      </Banner>
      <Grid>
        {companies
          .sort((a, b) => a.localeCompare(b))
          .map((option, i) => {
            const count = jobs.filter((job) => job.company === option).length;
            const active = company.includes(option);
            return (
              <Cell
                key={i}
                onClick={() => dispatch(setFilter("company", option))}
                active={active}
              >
                <Status count={count}>&bull;</Status>
                {option} {count}
              </Cell>
            );
          })}
      </Grid>
      <Grid>
        {keywords
          .sort((a, b) => a.localeCompare(b))
          .map((option, i) => {
            const active = technologies.includes(option);
            return (
              <Cell
                key={i}
                onClick={() => dispatch(setFilter("technologies", option))}
                active={active}
              >
                {option}
              </Cell>
            );
          })}
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.25em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-top: 1.25em;
  margin-top: 1.25em;
  border-top: 1px solid #edf2f7;
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Cell = styled.div`
  margin: 4px;
  padding: 0.75em;
  font-size: 0.875em;
  font-weight: ${({ active }) => (active ? "700" : "400")};
  border-radius: 4px;
  color: ${({ active }) => (active ? "#FFFFFF" : "inherit")};
  background: ${({ active }) => (active ? "#5A67D8" : "none")};
  &:hover {
    cursor: pointer;
    background: ${({ active }) => (active ? "#5A67D8" : "#edf2f7")};
  }
`;

const Status = styled.span`
  margin-right: 4px;
  color: ${({ count }) => (count === 0 ? "#E53E3E" : "#48BB78")};
  font-size: 1.125em;
`;

export default Menu;
