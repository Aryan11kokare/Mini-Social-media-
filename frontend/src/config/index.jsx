import axios from "axios";

export const BASE_URL = "https://mini-social-media-zkhc.onrender.com";
export const clientServer = axios.create({
  baseURL: BASE_URL,
});
