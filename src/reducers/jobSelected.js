const SET_JOB_SELECTED = "SET_JOB_SELECTED";

export const setJobSelected = (job) => ({
  type: SET_JOB_SELECTED,
  job,
});

const jobSelectedReducer = (state = null, action) => {
  switch (action.type) {
    case SET_JOB_SELECTED:
      return action.job;
    default:
      return state;
  }
};

export default jobSelectedReducer;
