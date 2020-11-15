import { getJobs } from "../services/jobs";
import { sleep } from "../util";

const JOBS_API_PENDING = "JOBS_API_PENDING";
const JOBS_API_SUCCESS = "JOBS_API_SUCCESS";
const JOBS_API_FAILURE = "JOBS_API_FAILURE";

const HIGHLIGHT_JOB = "HIGHLIGHT_JOB";
const APPLY_JOB = "APPLY_JOB";

const pending = () => ({
  type: JOBS_API_PENDING,
});

const success = (data) => ({
  type: JOBS_API_SUCCESS,
  data,
});

const failure = (error) => ({
  type: JOBS_API_FAILURE,
  error,
});

export const fetchJobs = () => {
  return async (dispatch) => {
    dispatch(pending());
    try {
      const jobs = await getJobs();
      await sleep(2000);
      dispatch(success(jobs));
    } catch (error) {
      dispatch(failure(error));
    }
  };
};

export const highlightJob = (id) => ({
  type: HIGHLIGHT_JOB,
  id,
});

export const applyJob = (id) => ({
  type: APPLY_JOB,
  id,
});

const INITIAL_STATE = {
  pending: false,
  data: [],
  error: null,
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case JOBS_API_PENDING:
      return { ...state, pending: true };
    case JOBS_API_SUCCESS:
      const data = checkApplied(action.data);
      return { ...state, data, pending: false };
    case JOBS_API_FAILURE:
      return { ...state, error: action.error, pending: false };
    case HIGHLIGHT_JOB:
      return {
        ...state,
        data: toggleJobProp(state.data, action.id, "highlighted"),
      };
    case APPLY_JOB:
      cacheApplied(action.id);
      return {
        ...state,
        data: toggleJobProp(state.data, action.id, "applied"),
      };
    default:
      return state;
  }
};

const checkApplied = (jobs) =>
  jobs.map((job) => {
    const applied = JSON.parse(localStorage.getItem("junior_dev_jobs_applied"));
    if (applied.includes(job.id)) {
      return { ...job, applied: true };
    } else {
      return { ...job, applied: false };
    }
  });

const cacheApplied = (id) => {
  let applied = JSON.parse(localStorage.getItem("junior_dev_jobs_applied"));
  if (applied) {
    if (applied.includes(id)) {
      applied = applied.filter((e) => e !== id);
    } else {
      applied = [...applied, id];
    }
  } else {
    applied = [id];
  }
  localStorage.setItem("junior_dev_jobs_applied", JSON.stringify(applied));
};

const toggleJobProp = (jobs, id, prop) =>
  jobs.map((job) => {
    if (job.id === id) {
      return { ...job, [prop]: !job[prop] };
    } else {
      return job;
    }
  });

export default jobsReducer;
