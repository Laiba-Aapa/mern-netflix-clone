// import axios from "axios"
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const apiRequest = axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
});

export default apiRequest;
