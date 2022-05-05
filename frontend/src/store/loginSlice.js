import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	email: "",
	user: null,
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
	},
});

export const { setUser, setEmail, setLogin } = loginSlice.actions;

export default loginSlice.reducer;
