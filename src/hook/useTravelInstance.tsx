import axios, { AxiosInstance } from "axios";

const API_SERVER = "http://apis.data.go.kr/B551011/KorService2";

function useTravelInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: API_SERVER,
    timeout: 1000 * 5,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return instance;
}

export default useTravelInstance;
