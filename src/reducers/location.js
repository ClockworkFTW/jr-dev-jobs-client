import { getCurrentLocation } from "../services/location";

const LOCATION_API_PENDING = "LOCATION_API_PENDING";
const LOCATION_API_SUCCESS = "LOCATION_API_SUCCESS";
const LOCATION_API_FAILURE = "LOCATION_API_FAILURE";

const pending = () => ({
  type: LOCATION_API_PENDING
});

const success = location => ({
  type: LOCATION_API_SUCCESS,
  location
});

const failure = error => ({
  type: LOCATION_API_FAILURE,
  error
});

export const fetchLocation = () => {
  return async dispatch => {
    dispatch(pending());
    try {
      const location = await getCurrentLocation();
      dispatch(success(location));
    } catch (error) {
      dispatch(failure(error));
    }
  };
};

const INITIAL_STATE = {
  pending: false,
  data: null,
  error: null
};

const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION_API_PENDING:
      return { ...state, pending: true };
    case LOCATION_API_SUCCESS:
      return { ...state, data: action.location, pending: false };
    case LOCATION_API_FAILURE:
      return { ...state, error: action.error, pending: false };
    default:
      return state;
  }
};

export default locationReducer;
