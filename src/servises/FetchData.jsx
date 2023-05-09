const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'fae442014c974ac619f95851fb255ed7';

export const getTrending = () => {
    return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
}

export const searchMovies = (query) => {
    return fetch(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`);
}

export const getMovieDetail = (movieID) => {
    return fetch(`${BASE_URL}/movie/${movieID}?api_key=${API_KEY}`);
}

export const getMovieCredits = (movieID) => {
    return fetch(`${BASE_URL}/movie/${movieID}/credits?api_key=${API_KEY}`);
}

export const getMovieReview = (movieID) => {
    return fetch(`${BASE_URL}/movie/${movieID}/reviews?api_key=${API_KEY}`);
}