import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://api.openaq.org/v1/"
});

export default axiosInstance;