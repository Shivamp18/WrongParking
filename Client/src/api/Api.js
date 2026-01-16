
import axios from "axios";

const API = import.meta.env.VITE_API_URL;


export const registerUser = async (data) => {
  try {
    const res = await axios.post(`${API}/api/auth/register`, data);
    return res;
  } catch (err) {
    console.error("Register API Error:", err);
    throw err;
  }
};


export const loginUser = async (data) => {
  try {
    console.log(data);
    const res = await axios.post(`${API}/auth/login`, data);
    return res;
  } catch (err) {
    console.error("Login API Error:", err);
    throw err;
  }
};

export const updateUser = async (data) => {
  try {
    const res = await axios.put(`${API}/auth/update`, data);
    return res;
  } catch (err) {
    console.error("Update API Error:", err);
    throw err;
  }
};