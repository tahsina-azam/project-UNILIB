import axios from "axios";
/**
 * sets baseURL and sets token in the local storage
 */
const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export default instance;
