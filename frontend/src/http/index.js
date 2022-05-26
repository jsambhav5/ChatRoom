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
export const login = async (data) => api.post("/api/auth/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const logout = () => api.post("/api/auth/logout");
export const createRoom = (data) => api.post("/api/rooms", data);
export const getAllRooms = () => api.get("/api/rooms");

// Interceptors
api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response.status === 401 &&
			originalRequest &&
			!originalRequest.isRetry
		) {
			originalRequest.isRetry = true;
			try {
				await axios.post(
					`${BASE_URL}:${BACK_END_PORT}/api/auth/refresh`,
					{},
					{
						withCredentials: true,
					}
				);
				return api.request(originalRequest);
			} catch (error) {
				console.log(error.message);
			}
		}
		throw error;
	}
);

export default api;
