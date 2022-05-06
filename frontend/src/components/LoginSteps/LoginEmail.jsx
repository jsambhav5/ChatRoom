import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, BackButton, TextInput } from "..";
import styles from "./LoginSteps.module.css";
import { useDispatch } from "react-redux";
import { setEmail as saveEmail } from "../../store/loginSlice.js";
import { setStep } from "../../store/loginSlice";

const LoginEmail = () => {
	const [email, setEmail] = useState("");
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
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<div>
				<div className={styles.actionButtonWrapper}>
					<BackButton onClick={back} text="Back" />
					<Button onClick={next} text="Next" />
				</div>
				<p className={styles.bottomParagraph}>
					By entering your email-id, you’re agreeing to our Terms of
					Service and Privacy Policy. Thanks!
				</p>
			</div>
		</Card>
	);
};

export default LoginEmail;
