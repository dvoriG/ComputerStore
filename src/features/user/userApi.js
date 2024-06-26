
import axios from "axios";

let baseUrl = "http://localhost:5000/api/users";

export const loginInServer = (user) => {
  return axios.post(`${baseUrl}/login`, user);
};
export const registerInServer = (user) => {
  return axios.post(`${baseUrl}`, user);
};
