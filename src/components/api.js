// api.js

import axios from 'axios';

const backendURL = 'http://localhost:5000'; // Replace with your backend URL

const api = axios.create({
  baseURL: backendURL,
});

export const getAllMovies = () => api.get('/api/movies');
export const createMovie = (newMovie) => api.post('/api/movies', newMovie);
export const updateMovie = (id, updatedMovie) => api.put(`/api/movies/${id}`, updatedMovie);
export const deleteMovie = (id) => api.delete(`/api/movies/${id}`);
export const searchMovies = (query) => api.get(`/api/movies/search?query=${query}`);


export default api;
