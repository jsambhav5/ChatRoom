import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginSteps.module.css";
import { Card, Button, BackButton, TextInput } from "..";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLogin } from "../../store/loginSlice.js";
import { login } from "../../http";

const LoginPassword = ({ onNext }) => {
	const [password, setPassword] = useState("");
	const email = useSelector((state) => state.login.email);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function Submit() {
		try {
			const res = await login({ email, password });
			if (res.status === 200) {
				dispatch(setLogin(true));
				dispatch(setUser(res.data.user));
			}
		} catch (error) {
			navigate("/");
			console.log(error);
		}
	}

	return (
		<Card title="Enter Password" icon="logo">
			<TextInput
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<div>
				<div className={styles.actionButtonWrapper}>
					<BackButton onClick={onNext} text="Back" />
					<Button onClick={Submit} text="Next" />
				</div>
				<p className={styles.bottomParagraph}>
					By entering your email-id, you’re agreeing to our Terms of
					Service and Privacy Policy. Thanks!
				</p>
			</div>
		</Card>
	);
};

export default LoginPassword;
