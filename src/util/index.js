import { createSelector } from "reselect";

export const reduceJobs = createSelector(
  (state) => state.jobs.data,
  (state) => state.filters,
  (state) => state.sort,
  (state) => state.location,
  (jobs, filters, sort, location) => {
    // Initialize variable
    let reducedJobs;

    // Filter jobs
    const { search, company, technologies, remote, applied } = filters;
    reducedJobs = jobs.filter((job) => {
      // Check if job title contains search value
      const filteredByTitle = job.title
        .toLowerCase()
        .includes(search.toLowerCase());

      // Check if job company matches filter criteria
      const filteredByCompany =
        company.length === 0 ? true : company.includes(job.company);

      // Check if job technologies match filter criteria
      let filteredByTechnology = technologies.length === 0 ? true : false;
      if (job.technologies) {
        job.technologies.forEach((e) => {
          if (technologies.includes(e[0])) filteredByTechnology = true;
        });
      }

      // Check if job is remote
      const filteredByRemote = remote ? job.location === "remote" : true;

      // Check if job has been applied to
      const filterByApplied = applied ? job.applied : true;

      // Apply all filters to jobs array
      if (
        filteredByTitle &&
        filteredByCompany &&
        filteredByTechnology &&
        filteredByRemote &&
        filterByApplied
      ) {
        return true;
      } else {
        return false;
      }
    });

    // Sort jobs
    const { distance, rating, salary, time } = sort;
    reducedJobs = reducedJobs.sort((a, b) => {
      // Sort by distance if user location is given
      if (distance && location.data) {
        // Get distance from current job to user
        const aDist = getDistance(
          a.coordinates ? a.coordinates.lat : location.data.latitude,
          a.coordinates ? a.coordinates.lng : location.data.longitude,
          location.data.latitude,
          location.data.longitude
        );
        // Get distance from next job to user
        const bDist = getDistance(
          b.coordinates ? b.coordinates.lat : location.data.latitude,
          b.coordinates ? b.coordinates.lng : location.data.longitude,
          location.data.latitude,
          location.data.longitude
        );
        // Sort jobs array by ascending distance
        if (distance === "asc") {
          return bDist - aDist;
        }
        if (distance === "dsc") {
          return aDist - bDist;
        }
      }

      // Sort by rating
      if (rating) {
        if (rating === "asc") {
          return a.reviews[0][1] - b.reviews[0][1];
        }
        if (rating === "dsc") {
          return b.reviews[0][1] - a.reviews[0][1];
        }
      }

      // Sort by salary
      if (salary) {
        if (salary === "asc") {
          return (
            a.salary[0].Total.slice(1, -1) - b.salary[0].Total.slice(1, -1)
          );
        }
        if (salary === "dsc") {
          return (
            b.salary[0].Total.slice(1, -1) - a.salary[0].Total.slice(1, -1)
          );
        }
      }

      // Sort by time
      if (time) {
        if (time === "asc") {
          return new Date(a.time) - new Date(b.time);
        }
        if (time === "dsc") {
          return new Date(b.time) - new Date(a.time);
        }
      }
    });

    return reducedJobs;
  }
);

// Get the distance between 2 lat/lng pairs
const getDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
};

// Pause execution for specified time in milliseconds
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
