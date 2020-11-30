import { combineReducers } from "redux";

import jobFocusedReducer from "./jobFocused";
import jobSelectedReducer from "./jobSelected";
import jobsReducer from "./jobs";
import sortReducer from "./sort";
import filterReducer from "./filter";
import locationReducer from "./location";
import viewportReducer from "./viewport";

const rootReducer = combineReducers({
  jobFocused: jobFocusedReducer,
  jobSelected: jobSelectedReducer,
  jobs: jobsReducer,
  sort: sortReducer,
  filters: filterReducer,
  location: locationReducer,
  viewport: viewportReducer,
});

export default rootReducer;
