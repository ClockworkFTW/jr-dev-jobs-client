export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

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
  const { search, company, remote, favorite } = filters;

  return jobs.filter((job) => {
    // Check if job title contains search value
    const filteredByTitle = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

    // Check if job company matches filter criteria
    const filteredByCompany =
      company.length === 0 ? true : company.includes(job.company);

    // Check if job is remote
    const filteredByRemote = remote
      ? job.location === "remote"
      : job.location !== "remote";

    // Check if job is favorited
    const filterByFavorite = favorite ? job.favorite : true;

    // Apply all filters to jobs array
    if (
      filteredByTitle &&
      filteredByCompany &&
      filteredByRemote &&
      filterByFavorite
    ) {
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
    return aDist - bDist;
  });

export const reduceJobs = ({ jobs, location, filters }) => {
  let reducedJobs = filterJobs(jobs.data, filters);

  if (location.data) {
    reducedJobs = sortJobs(reducedJobs, location);
  }

  return reducedJobs;
};
