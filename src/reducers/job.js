const JOB_SET_VIEWING = "JOB_SET_VIEWING";

export const setViewing = (job) => ({
  type: JOB_SET_VIEWING,
  job,
});

const jobReducer = (state = null, action) => {
  switch (action.type) {
    case JOB_SET_VIEWING:
      return action.job;
    default:
      return state;
  }
};

export default jobReducer;
