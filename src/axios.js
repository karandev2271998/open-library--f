import axios from "axios";
const https = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {"Access-Control-Allow-Origin": "*"},
});
export default https;