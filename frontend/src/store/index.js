import { configureStore } from "@reduxjs/toolkit";
import login from "./loginSlice";
import otp from "./otpSlice.js";

export const store = configureStore({
	reducer: {
		login,
		otp,
	},
});
