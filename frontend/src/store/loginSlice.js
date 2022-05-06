import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	email: "",
	user: null,
	step: 1,
};

export const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setLogin: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		setStep: (state, action) => {
			state.step = action.payload;
		},
	},
});

export const { setUser, setEmail, setLogin, setStep } = loginSlice.actions;

export default loginSlice.reducer;
