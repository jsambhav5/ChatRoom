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
		<div className={styles.cardWrapper}>
			<Card title="Welcome to ChatRoom" icon="logo">
				<p className={styles.text}>
					We’re working hard to get ChatRoom ready for everyone! While
					we wrap up the finishing touches, we’re adding people
					gradually to make sure nothing breaks
				</p>
				<div>
					<Button
						onClick={startRegister}
						text="Get Your Username"
					></Button>
				</div>
				<div>
					<span className={styles.hasInvite}>
						Have an invite text?
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
