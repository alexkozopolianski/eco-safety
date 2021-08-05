import * as types from "./types";
import { getMovies, getMovieById } from "../../api/index";

export function beginApiCall() {
  return {
    type: types.BEGIN_API_CALL,
  };
}

export function loadMovieSuccess(searchResponse) {
  return {
    type: types.LOAD_MOVIES_SUCCESS,
    searchResponse,
  };
}

export function loadMovies(searchTerm) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getMovies(searchTerm)
      .then((searchResponse) => {
        dispatch(loadMovieSuccess(searchResponse));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function displayMovieDetailsSuccess(movieDetails) {
  return {
    type: types.DISPLAY_MOVIE_DETAILS_SUCCESS,
    movieDetails,
  };
}

export function displayMovieDetails(movieId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getMovieById(movieId)
      .then((movieDetails) => {
        dispatch(displayMovieDetailsSuccess(movieDetails));
      })
      .catch((error) => {
        throw error;
      });
  };
}
