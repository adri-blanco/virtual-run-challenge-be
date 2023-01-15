import axios from "axios";

const StravaAxios = axios.create({
  baseURL: "https://www.strava.com/api/v3",
});

export function setToken(token: string) {
  StravaAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

StravaAxios.interceptors.response.use(
  (config) => {
    return config.data;
  },
  (err) =>
    Promise.reject({
      status: err.response.status,
      ...err.response.data,
    }),
);

export default StravaAxios;
