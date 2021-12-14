import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  // APIのURI
  baseURL: 'http://localhost:3000/hamster-observation/realtime-cawaii-bo',
  // リクエストヘッダ
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiClient;
