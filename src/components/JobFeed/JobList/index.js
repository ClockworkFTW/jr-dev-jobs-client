import React from "react";
import { useDispatch } from "react-redux";

import { setViewport } from "../../../reducers/map";
import { setFavorite } from "../../../reducers/jobs";

import { Count } from "./Count";
import { Job } from "./Job";

const JobList = ({ jobs, setViewing }) => {
  const dispatch = useDispatch();

  const favorite = (id) => dispatch(setFavorite(id));

  const selectJob = (job) => {
    setViewing(job);
    if (job.coordinates) {
      dispatch(
        setViewport({
          latitude: job.coordinates.lat,
          longitude: job.coordinates.lng,
          zoom: 10,
        })
      );
    }
  };

  return (
    <ul>
      <Count count={jobs.length} />
      {jobs.map((job, i) => (
        <Job key={i} job={job} setFavorite={favorite} selectJob={selectJob} />
      ))}
    </ul>
  );
};

export default JobList;
