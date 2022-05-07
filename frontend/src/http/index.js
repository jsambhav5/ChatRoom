import { BASE_URL, BACK_END_PORT } from "../config";
import axios from "axios";

const api = axios.create({
	baseURL: `${BASE_URL}:${BACK_END_PORT}`,
	withCredentials: true,
	headers: {
		"content-type": "application/json",
		Accept: "application/json",
	},
});

//list of all end-points
export const sendOTP = (data) => api.post("/api/auth/sendOTP", data);
export const verifyOTP = (data) => api.post("/api/auth/verifyOTP", data);
export const login = (data) => api.post("/api/auth/login", data);
export const register = (data) => api.post("/api/user/register", data);

export default api;
