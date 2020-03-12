import axios from "axios";

const baseURL = "http://localhost:3005/jobs";

export const getJobs = async () => {
  const jobs = await axios.get(baseURL);
  return jobs.data;
};
