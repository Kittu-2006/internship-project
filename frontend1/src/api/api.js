// frontend1/src/api/api.js
import axios from 'axios';

// Create an axios instance with base URL of backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // backend URL prefix
  withCredentials: false
});

export default api;
