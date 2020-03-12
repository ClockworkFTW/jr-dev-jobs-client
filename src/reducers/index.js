import { combineReducers } from "redux";

import jobsReducer from "./jobs";
import locationReducer from "./location";
import filterReducer from "./filter";
import mapReducer from "./map";

const rootReducer = combineReducers({
  jobs: jobsReducer,
  location: locationReducer,
  filters: filterReducer,
  map: mapReducer
});

export default rootReducer;
