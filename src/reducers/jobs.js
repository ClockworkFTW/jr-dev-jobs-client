import { getJobs } from "../services/jobs";

const JOBS_API_PENDING = "JOBS_API_PENDING";
const JOBS_API_SUCCESS = "JOBS_API_SUCCESS";
const JOBS_API_FAILURE = "JOBS_API_FAILURE";

const pending = () => ({
  type: JOBS_API_PENDING
});

const success = jobs => ({
  type: JOBS_API_SUCCESS,
  jobs
});

const failure = error => ({
  type: JOBS_API_FAILURE,
  error
});

export const fetchJobs = () => {
  return async dispatch => {
    dispatch(pending());
    try {
      const jobs = await getJobs();
      dispatch(success(jobs));
    } catch (error) {
      dispatch(failure(error));
    }
  };
};

const INITIAL_STATE = {
  pending: false,
  data: [],
  error: null
};

const jobsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case JOBS_API_PENDING:
      return { ...state, pending: true };
    case JOBS_API_SUCCESS:
      return { ...state, data: action.jobs, pending: false };
    case JOBS_API_FAILURE:
      return { ...state, error: action.error, pending: false };
    default:
      return state;
  }
};

export default jobsReducer;
