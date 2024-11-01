import axios from 'axios';

// todo update the base url here so that it  works in the deployment as well
const BASE_URL = import.meta.env.MODE = 'development' ? 'http://localhost:5000/api' : '/api'

export const axiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})