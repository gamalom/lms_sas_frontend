import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json", //send vairako data ko format
    Accept: "application/json", // kasto data accept garne
  },
});

export default API;
