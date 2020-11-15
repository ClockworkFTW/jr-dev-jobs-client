const SET_SORT = "SET_SORT";

export const setSort = (sort) => ({
  type: SET_SORT,
  sort,
});

const INITIAL_STATE = {
  distance: "dsc",
  rating: null,
  salary: null,
};

const sortReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SORT:
      let update = {};
      for (const prop in state) {
        if (prop === action.sort) {
          switch (state[prop]) {
            case "asc":
              update[prop] = "dsc";
              break;
            case "dsc":
              update[prop] = "asc";
              break;
            default:
              update[prop] = "dsc";
              break;
          }
        } else {
          update[prop] = null;
        }
      }
      return update;
    default:
      return state;
  }
};

export default sortReducer;
