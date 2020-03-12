const SET_VIEWPORT = "SET_VIEWPORT";

export const setViewport = viewport => ({
  type: SET_VIEWPORT,
  viewport
});

const INITIAL_STATE = {
  latitude: null,
  longitude: null,
  zoom: null
};

const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_VIEWPORT:
      return action.viewport;
    default:
      return state;
  }
};

export default mapReducer;
