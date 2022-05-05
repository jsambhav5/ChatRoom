import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
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
			<div className={`${styles.navRight}`}>
				<Link to="/login">
					<span style={logoText}>LogIn</span>
				</Link>

				<Link to="/register">
					<span style={logoText}>SignUp</span>
				</Link>
			</div>
		</nav>
	);
};

export default Navigation;
