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

const filterJobs = (jobs, filters) => {
  const { search, company, remote } = filters;

  return jobs.filter(job => {
    // Check if job title contains search value
    const filteredByTitle = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

    // Check if job company matches filter criteria
    const filteredByCompany =
      company === "All companies" ? true : job.company === company;

    // Check if job is remote
    const filteredByRemote = remote ? true : job.location !== "remote";

    // Apply all filters to jobs array
    if (filteredByTitle && filteredByCompany && filteredByRemote) {
      return true;
    } else {
      return false;
    }
  });
};

const sortJobs = (jobs, location) =>
  jobs.sort((a, b) => {
    // Get distance from current job to user
    const aDist = getDistance(
      a.coords ? a.coords.lat : location.data.latitude,
      a.coords ? a.coords.lng : location.data.longitude,
      location.data.latitude,
      location.data.longitude
    );
    // Get distance from next job to user
    const bDist = getDistance(
      b.coords ? b.coords.lat : location.data.latitude,
      b.coords ? b.coords.lng : location.data.longitude,
      location.data.latitude,
      location.data.longitude
    );
    // Sort jobs array by ascending distance
    return aDist - bDist;
  });

export const reduceJobs = ({ jobs, location, filters }) => {
  let reducedJobs = filterJobs(jobs.data, filters);

  if (location.data) {
    reducedJobs = sortJobs(reducedJobs, location);
  }

  return reducedJobs;
};
