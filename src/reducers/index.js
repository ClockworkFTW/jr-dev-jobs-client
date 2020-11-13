import { combineReducers } from "redux";

import jobReducer from "./job";
import jobsReducer from "./jobs";
import filterReducer from "./filter";
import locationReducer from "./location";

const rootReducer = combineReducers({
  job: jobReducer,
  jobs: jobsReducer,
  filters: filterReducer,
  location: locationReducer,
});

export default rootReducer;
