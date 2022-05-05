import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	hash: "",
	email: "",
};

export const otpSlice = createSlice({
	name: "otp",
	initialState,
	reducers: {
		setOTP: (state, action) => {
			state.email = action.payload.email;
			state.hash = action.payload.hash;
		},
	},
});

export const { setOTP } = otpSlice.actions;

export default otpSlice.reducer;
