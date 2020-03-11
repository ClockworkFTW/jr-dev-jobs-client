import React, { useState, useEffect } from "react";

import { getJobs } from "./services/jobs";
import { getCurrentLocation } from "./services/location";
import { getDistance } from "./util";

import { GlobalStyle } from "./components/common";
import JobFeed from "./components/JobFeed";
import Mapbox from "./components/Mapbox";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [position, setPosition] = useState(null);
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("All companies");
  const [remote, setRemote] = useState(false);

  useEffect(() => {
    getCurrentLocation(setPosition);
    getJobs(setJobs);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const includeTitle = job.title.toLowerCase().includes(search.toLowerCase());
    const includeCompany =
      company === "All companies" ? true : job.company === company;
    const includeRemote = remote ? true : job.location !== "remote";
    return includeTitle && includeCompany && includeRemote ? true : false;
  });

  const sortedJobs = position
    ? filteredJobs.sort((a, b) => {
        const aDist = getDistance(
          a.coords ? a.coords.lat : position.latitude,
          a.coords ? a.coords.lng : position.longitude,
          position.latitude,
          position.longitude
        );
        const bDist = getDistance(
          b.coords ? b.coords.lat : position.latitude,
          b.coords ? b.coords.lng : position.longitude,
          position.latitude,
          position.longitude
        );
        return aDist - bDist;
      })
    : filteredJobs;

  return (
    <>
      <GlobalStyle />
      <JobFeed
        count={sortedJobs.length}
        search={search}
        setSearch={setSearch}
        company={company}
        setCompany={setCompany}
        remote={remote}
        setRemote={setRemote}
        jobs={sortedJobs}
      />
      <Mapbox jobs={sortedJobs} position={position} />
    </>
  );
};

export default App;
