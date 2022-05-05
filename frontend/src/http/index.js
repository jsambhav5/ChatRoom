import { BASE_URL, BACK_END_PORT } from "../config";
import axios from "axios";

const api = axios.create({
	baseURL: `${BASE_URL}:${BACK_END_PORT}`,
	headers: {
		"content-type": "application/json",
		Accept: "application/json",
	},
	withCredentials: true,
});

//list of all end-points
export const sendOTP = (data) => api.post("/api/auth/sendOTP", data);
export const verifyOTP = (data) => api.post("/api/auth/verifyOTP", data);
export const login = (data) => api.post("/api/auth/login", data);

export default api;
