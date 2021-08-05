import { combineReducers } from "redux";
import searchResponse from "./moviesReducer";
import movieDetails from "./movieReducer";

const rootReducer = combineReducers({
  searchResponse,
  movieDetails,
});

export default rootReducer;
