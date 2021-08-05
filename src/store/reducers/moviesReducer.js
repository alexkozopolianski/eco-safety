import * as types from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_MOVIES_SUCCESS:
      return action.searchResponse;
    default:
      return state;
  }
};
