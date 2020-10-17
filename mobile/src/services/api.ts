import axios from 'axios';
//import { SERVER_ADDRESS } from 'react-native-dotenv';
import { SERVER_ADDRESS } from '../config/environment/dev.env.js';
//https://www.reactnative.guide/6-conventions-and-code-style/6.3-environment-variables.html

console.log(SERVER_ADDRESS);

const api = axios.create({
  baseURL: SERVER_ADDRESS
});

export default api;
