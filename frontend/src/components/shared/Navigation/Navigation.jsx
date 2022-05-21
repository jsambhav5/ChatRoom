import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Navigation.module.css";
import { setLogin, setUser, setEmail } from "../../../store/loginSlice";

const Navigation = () => {
	const dispatch = useDispatch();
	const { isLoggedIn, user } = useSelector((state) => state.login);

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
			<Link className={styles.navLink} to="/">
				<img
					src="/images/logo.png"
					className={`${styles.logo}`}
					alt="Logo"
				/>
				<span className={styles.logoText}>ChatRoom</span>
			</Link>

			{isLoggedIn && (
				<div className={styles.navRight}>
					<Link className={styles.navLink} to="profile">
						<h3 className={styles.userName}>{user.name}</h3>
						<img
							className={styles.avatar}
							src={user.avatar}
							width="40"
							height="40"
							alt="avatar"
						/>
					</Link>
					<button onClick={logoutUser}>
						<img src="/images/logout.png" alt="logout" />
					</button>
				</div>
			)}
		</nav>
	);
};

export default Navigation;
