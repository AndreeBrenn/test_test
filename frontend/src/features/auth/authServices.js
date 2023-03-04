import Cookies from "js-cookie";
import axios from "axios";
import { API_USER } from "../../utils/Urls";

const login = async (userData) => {
  const response = await axios.post(API_USER + "login", userData);

  return response.data;
};

const authServices = {
  login,
};

export default authServices;
