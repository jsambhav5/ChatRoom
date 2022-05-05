import React from "react";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button } from "../../components";

const Home = () => {
	const navigate = useNavigate();

	const startRegister = () => {
		navigate("/register");
	};

	const signInLinkStyle = {
		color: "#0077ff",
		fontWeight: "bold",
		textDecoration: "none",
		marginLeft: "10px",
	};

	return (
		<div className="cardWrapper">
			<Card title="Welcome to ChatRoom" icon="logo">
				<p className={styles.text}>
					ChatRoom is a Group Voice calling App based on Peer-to-Peer
					Network. It is a secured way to connect with your friends,
					family and colleagues
				</p>
				<div>
					<Button onClick={startRegister} text="Create New Account" />
				</div>
				<div className={styles.signInWrapper}>
					<span className={styles.hasInvite}>
						Already have an Account?
					</span>
					<Link style={signInLinkStyle} to="/login">
						SignIn
					</Link>
				</div>
			</Card>
		</div>
	);
};

export default Home;