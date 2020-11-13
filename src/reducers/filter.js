const SET_FILTER = "SET_FILTER";

export const setFilter = (name, value) => ({
  type: SET_FILTER,
  filter: { name, value },
});

const INITIAL_STATE = {
  search: "",
  company: [],
  remote: false,
  favorite: false,
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FILTER:
      const { name, value } = action.filter;
      if (name === "reset") {
        return INITIAL_STATE;
      } else if (name === "company") {
        let { company } = state;
        if (company.includes(value)) {
          company = company.filter((e) => e !== value);
        } else {
          company = [...company, value];
        }
        return { ...state, company };
      } else {
        return { ...state, [name]: value };
      }
    default:
      return state;
  }
};

export default filterReducer;
