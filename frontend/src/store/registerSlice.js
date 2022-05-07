import { createSlice } from "@reduxjs/toolkit";
import { sampleAvatar } from "../sampleAvatar";

const initialState = {
	step: 1,
	email: "",
	name: "",
	password: "",
	avatar: sampleAvatar,
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
		initRegister: (state) => {
			state.step = 1;
			state.email = "";
			state.name = "";
			state.password = "";
			state.avatar = sampleAvatar;
		},
	},
});

export const {
	setStep,
	setEmail,
	setName,
	setPassword,
	setAvatar,
	initRegister,
} = registerSlice.actions;

export default registerSlice.reducer;
