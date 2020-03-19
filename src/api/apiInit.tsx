import axios from "axios";

export const API_BASE_URL = "https://api.github.com/";

export const initApi = () => {
  axios.defaults.baseURL = `${API_BASE_URL}`;
};
