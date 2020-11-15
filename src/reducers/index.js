import { combineReducers } from "redux";

import jobReducer from "./job";
import jobsReducer from "./jobs";
import sortReducer from "./sort";
import filterReducer from "./filter";
import locationReducer from "./location";
import viewportReducer from "./viewport";

const rootReducer = combineReducers({
  job: jobReducer,
  jobs: jobsReducer,
  sort: sortReducer,
  filters: filterReducer,
  location: locationReducer,
  viewport: viewportReducer,
});

export default rootReducer;
