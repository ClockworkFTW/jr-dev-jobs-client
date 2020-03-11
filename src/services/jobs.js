import axios from "axios";

const baseURL = "http://localhost:3005/jobs";

export const getJobs = async setJobs => {
  const jobs = await axios.get(baseURL);
  setJobs(jobs.data);
};
