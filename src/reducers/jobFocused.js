const SET_JOB_FOCUSED = "SET_JOB_FOCUSED";

export const setJobFocused = (job) => ({
  type: SET_JOB_FOCUSED,
  job,
});

const jobFocusedReducer = (state = null, action) => {
  switch (action.type) {
    case SET_JOB_FOCUSED:
      return action.job;
    default:
      return state;
  }
};

export default jobFocusedReducer;
