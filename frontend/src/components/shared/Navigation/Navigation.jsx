import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Navigation.module.css";
import { setLogin, setUser, setEmail } from "../../../store/loginSlice";

const Navigation = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
	const brandStyle = {
		color: "#fff",
		textDecoration: "none",
		fontWeight: "bold",
		fontSize: "22px",
		display: "flex",
		alignItems: "center",
	};

	const logoText = {
		marginLeft: "10px",
	};

	async function logoutUser() {
		try {
			const res = await logout();
			if (res.status === 200) {
				dispatch(setLogin(false));
				dispatch(setUser(null));
				dispatch(setEmail(""));
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<nav className={`${styles.navbar} container`}>
			<Link style={brandStyle} to="/">
				<img
					src="/images/logo.png"
					className={`${styles.logo}`}
					alt="Logo"
				/>
				<span style={logoText}>ChatRoom</span>
			</Link>
			{isLoggedIn && <button onClick={logoutUser}>Logout</button>}
		</nav>
	);
};

export default Navigation;
