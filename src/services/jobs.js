import axios from "axios";

const baseURL = "/api/jobs";

export const getJobs = async () => {
  const jobs = await axios.get(baseURL);
  return jobs.data;
};
