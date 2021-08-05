import * as types from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.DISPLAY_MOVIE_DETAILS_SUCCESS:
      return action.movieDetails;
    default:
      return state;
  }
};
