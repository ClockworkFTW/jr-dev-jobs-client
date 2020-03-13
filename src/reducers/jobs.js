import { getJobs } from "../services/jobs";

const JOBS_API_PENDING = "JOBS_API_PENDING";
const JOBS_API_SUCCESS = "JOBS_API_SUCCESS";
const JOBS_API_FAILURE = "JOBS_API_FAILURE";

const SET_FAVORITE = "SET_FAVORITE";

const FAVCACHE = "jr-dev-jobs-favorites";

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

export const setFavorite = id => ({
  type: SET_FAVORITE,
  id
});

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
      const jobs = setFavorites(action);
      return { ...state, data: jobs, pending: false };
    case JOBS_API_FAILURE:
      return { ...state, error: action.error, pending: false };
    case SET_FAVORITE:
      return handleSetFavorite(state, action);
    default:
      return state;
  }
};

const setFavorites = ({ jobs }) => {
  let cachedFavs = localStorage.getItem(FAVCACHE);

  if (cachedFavs) {
    cachedFavs = JSON.parse(cachedFavs);
    return jobs.map(job => {
      if (cachedFavs.includes(job.id)) {
        return { ...job, favorite: true };
      } else {
        return job;
      }
    });
  } else {
    return jobs;
  }
};

const cacheFavorites = ({ id }) => {
  let cachedFavs = localStorage.getItem(FAVCACHE);

  if (cachedFavs) {
    cachedFavs = JSON.parse(cachedFavs);
    if (cachedFavs.includes(id)) {
      cachedFavs = cachedFavs.filter(fav => fav !== id);
    } else {
      cachedFavs = [...cachedFavs, id];
    }
  } else {
    cachedFavs = [id];
  }

  console.log(cachedFavs);
  cachedFavs = JSON.stringify(cachedFavs);
  localStorage.setItem(FAVCACHE, cachedFavs);
};

const handleSetFavorite = (state, action) => {
  const jobs = state.data.map(job => {
    if (job.id === action.id) {
      return { ...job, favorite: !job.favorite };
    } else {
      return job;
    }
  });

  cacheFavorites(action);

  return { ...state, data: jobs };
};

export default jobsReducer;
