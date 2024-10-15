// import axios from "axios"
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const apiRequest = axios.create({
  // baseURL: `http://localhost:5000/api/v1`,
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
});

export default apiRequest;
