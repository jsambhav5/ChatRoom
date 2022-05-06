import { configureStore } from "@reduxjs/toolkit";
import login from "./loginSlice";
import otp from "./otpSlice";
import register from "./registerSlice";

export const store = configureStore({
	reducer: {
		login,
		otp,
		register,
	},
});
