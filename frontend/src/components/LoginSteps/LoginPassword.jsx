import React, { useState } from "react";
import styles from "./LoginSteps.module.css";
import { Link } from "react-router-dom";
import { Card, Button, BackButton, TextInput } from "..";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLogin } from "../../store/loginSlice.js";
import { login } from "../../http";
import { setStep } from "../../store/loginSlice";

const LoginPassword = () => {
	const [password, setPassword] = useState("");
	const email = useSelector((state) => state.login.email);
	const dispatch = useDispatch();

	async function next() {
		try {
			const res = await login({ email, password });
			if (res.status === 200) {
				dispatch(setStep(1));
				dispatch(setLogin(true));
				dispatch(setUser(res.data.user));
			}
			dispatch(setStep(1));
		} catch (error) {
			dispatch(setStep(1));
			console.log(error);
		}
	}

	function back() {
		dispatch(setStep(1));
	}

	return (
		<Card title="Enter Your Password" icon="lock-emoji">
			<TextInput
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
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

export default LoginPassword;
