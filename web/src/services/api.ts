import axios from 'axios';

//TODO change this address
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDRESS,
});

export default api;
