import axios from "axios";

const backendURL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: backendURL,
});

export const getAllMovies = (page, limit, ratingSort) =>
  api.get(
    `/api/movies/all?page=${page}&limit=${limit}&ratingSort=${ratingSort}`
  );
export const createMovie = (newMovie) =>
  api.post("/api/movies/createMovie", newMovie);
export const updateMovie = (id, updatedMovie) =>
  api.put(`/api/movies/update/${id}`, updatedMovie);
export const deleteMovie = (id) => api.delete(`/api/movies/delete/${id}`);
export const searchMovies = (page, limit, searchQuery) =>
  api.get(
    `/api/movies/search?page=${page}&limit=${limit}&search=${searchQuery}`
  );

export default api;
