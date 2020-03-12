import { combineReducers } from "redux";

import jobsReducer from "./jobs";
import locationReducer from "./location";
import filterReducer from "./filter";

const rootReducer = combineReducers({
  jobs: jobsReducer,
  location: locationReducer,
  filters: filterReducer
});

export default rootReducer;
