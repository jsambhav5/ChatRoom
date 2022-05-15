import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, BackButton, TextInput } from "..";
import styles from "./LoginSteps.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setEmail as saveEmail } from "../../store/loginSlice.js";
import { setStep } from "../../store/loginSlice";

const LoginEmail = () => {
	const [title, settitle] = useState("Enter Your Email Address");
	const [email, setEmail] = useState(
		useSelector((state) => state.login.email)
	);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function next() {
		if (!email) {
			settitle("Email Cannot be Empty");
			return;
		}
		dispatch(saveEmail(email));
		dispatch(setStep(2));
	}

	function back() {
		navigate("/");
	}

	return (
		<Card title={title} icon="email-emoji">
			<TextInput
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<div>
				<div className={styles.actionButtonWrapper}>
					<BackButton onClick={back} text="Back" />
					<Button onClick={next} text="Next" />
				</div>
				<div className={styles.signUpWrapper}>
					<span>Don't have an Account?</span>
					<Link className={styles.signUpLink} to="/register">
						Create New Account
					</Link>
				</div>
			</div>
		</Card>
	);
};

export default LoginEmail;
