// src/utils/api.js

const API_KEY = "255dc64c61f9e878b55f63f276f0ec7b";
const BASE_URL = "https://api.themoviedb.org/3";


async function get(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Erreur réseau");
    return res.json();
}


export const fetchMovies = (category = "popular", page = 1) =>
    get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`);


export const searchMovies = (query) =>
    get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);


export const fetchMovieDetails = (id) =>
    get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

export const fetchMovieCredits = (id) =>
    get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);


export const fetchSimilarMovies = (id) =>
    get(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
