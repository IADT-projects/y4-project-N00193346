import axios from "axios";

export default axios.create({
  baseURL: "http://backend-fyp.vercel.app/api",
});
