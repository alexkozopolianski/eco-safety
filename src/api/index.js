import axios from "axios";

const baseUrl = "http://www.omdbapi.com/?apikey=17d2dad8";

export function getMovies(searchTerm) {
  const fullUrl = baseUrl + "&s=" + searchTerm;
  return axios.get(fullUrl);
}

export function getMovieById(movieId) {
  return axios.get(baseUrl + "&i=" + movieId);
}
