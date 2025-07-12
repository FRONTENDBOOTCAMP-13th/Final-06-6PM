import axios, { AxiosInstance } from "axios";

const API_SERVER = 'https://fesp-api.koyeb.app/market';

function useAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: API_SERVER,
    timeout: 1000 * 10,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  });
  return instance;
}

export default useAxiosInstance;