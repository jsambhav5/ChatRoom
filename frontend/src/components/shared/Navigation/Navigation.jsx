import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../http";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Navigation.module.css";
import { setLogin, setUser, setEmail } from "../../../store/loginSlice";

const Navigation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoggedIn, user } = useSelector((state) => state.login);
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

	function profileButton() {
		navigate("/profile");
	}

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
			<button onClick={profileButton} style={brandStyle}>
				<img
					src="/images/logo.png"
					className={`${styles.logo}`}
					alt="Logo"
				/>
				<span style={logoText}>ChatRoom</span>
			</button>

			{isLoggedIn && (
				<div className={styles.navRight}>
					<button
						onClick={profileButton}
						className={styles.profileButton}
						to="/"
					>
						<h3 className={styles.userName}>{user.name}</h3>
						<img
							className={styles.avatar}
							src={user.avatar}
							width="40"
							height="40"
							alt="avatar"
						/>
					</button>
					<button onClick={logoutUser}>
						<img src="/images/logout.png" alt="logout" />
					</button>
				</div>
			)}
		</nav>
	);
};

export default Navigation;
