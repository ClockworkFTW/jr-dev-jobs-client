const SET_FILTER = "SET_FILTER";

export const setFilter = (name, value) => ({
  type: SET_FILTER,
  filter: { name, value }
});

const INITIAL_STATE = {
  search: "",
  company: "All companies",
  remote: false
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, [action.filter.name]: action.filter.value };
    default:
      return state;
  }
};

export default filterReducer;
