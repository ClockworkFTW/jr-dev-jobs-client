const SET_FILTER = "SET_FILTER";

export const setFilter = (prop, value) => ({
  type: SET_FILTER,
  filter: { prop, value },
});

const INITIAL_STATE = {
  search: "",
  company: [],
  technologies: [],
  remote: false,
  applied: false,
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FILTER:
      const { prop, value } = action.filter;
      switch (prop) {
        case "reset":
          return INITIAL_STATE;
        case "company":
          const company = toggleFilter(state.company, value);
          return { ...state, company };
        case "technologies":
          const technologies = toggleFilter(state.technologies, value);
          return { ...state, technologies };
        default:
          return { ...state, [prop]: value };
      }
    default:
      return state;
  }
};

const toggleFilter = (filter, value) => {
  if (filter.includes(value)) {
    return filter.filter((e) => e !== value);
  } else {
    return [...filter, value];
  }
};

export default filterReducer;
