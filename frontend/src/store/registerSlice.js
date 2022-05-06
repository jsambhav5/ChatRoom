import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	step: 1,
	email: "",
	name: "",
	password: "",
	avatar: null,
};

export const registerSlice = createSlice({
	name: "register",
	initialState,
	reducers: {
		setStep: (state, action) => {
			state.step = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setName: (state, action) => {
			state.name = action.payload;
		},
		setPassword: (state, action) => {
			state.password = action.payload;
		},
		setAvatar: (state, action) => {
			state.avatar = action.payload;
		},
	},
});

export const { setStep, setEmail, setName, setPassword, setAvatar } =
	registerSlice.actions;

export default registerSlice.reducer;
