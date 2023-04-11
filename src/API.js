import axios from "axios";

const apiKey = process.env.REACT_APP_APIKEY
const baseUrl = process.env.REACT_APP_BASEURL

export const getMovie = async () => {
    const movie = await axios.get(`${baseUrl}/movie/popular?page=1&api_key=${apiKey}`)
    return movie.data.results
}

export const searchMovie = async (q) => {
    const search = await axios.get(`${baseUrl}/search/movie?query=${q}&page=1&api_key=${apiKey}`)
    return search.data
}

export const nowPlaying = async () => {
    const result = await axios.get(`${baseUrl}/movie/now_playing?page=1&api_key=${apiKey}`)
    return result.data
}

export const topRated = async () => {
    const result = await axios.get(`${baseUrl}/movie/top_rated?page=1&api_key=${apiKey}`)
    return result.data
}

export const upComing = async () => {
    const result = await axios.get(`${baseUrl}/movie/upcoming?page=1&api_key=${apiKey}`)
    return result.data
}