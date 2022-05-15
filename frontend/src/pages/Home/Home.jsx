import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button } from "../../components";
import { useDispatch } from "react-redux";
import { setStep as setRegisterStep } from "../../store/registerSlice";
import { setStep as setLoginStep } from "../../store/loginSlice";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setRegisterStep(1));
		dispatch(setLoginStep(1));
	});

	const startRegister = () => {
		navigate("/register");
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
					<span>Already have an Account?</span>
					<Link className={styles.signInLink} to="/login">
						SignIn
					</Link>
				</div>
			</Card>
		</div>
	);
};

export default Home;
