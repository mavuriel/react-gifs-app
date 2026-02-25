import axios from "axios";

export const giphyApi = axios.create({
  baseURL: import.meta.env.VITE_GIPHY_URL,
  params: {
    lang: "es",
    api_key: import.meta.env.VITE_GIPHY_API_KEY,
  },
});
