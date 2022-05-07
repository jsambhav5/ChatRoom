import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, BackButton, TextInput } from "..";
import styles from "./LoginSteps.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setEmail as saveEmail } from "../../store/loginSlice.js";
import { setStep } from "../../store/loginSlice";

const LoginEmail = () => {
	const [email, setEmail] = useState(
		useSelector((state) => state.login.email)
	);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function next() {
		dispatch(saveEmail(email));
		dispatch(setStep(2));
	}

	function back() {
		navigate("/");
	}

	return (
		<Card title="Enter Your Email Address" icon="email-emoji">
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
					<span className={styles.hasInvite}>
						Don't have an Account?
						<Link className={styles.signUpLink} to="/register">
							Create New Account
						</Link>
					</span>
				</div>
			</div>
		</Card>
	);
};

export default LoginEmail;
