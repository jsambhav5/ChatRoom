import React, { useState } from "react";
import { Card, Button, TextInput } from "..";
import styles from "./LoginSteps.module.css";
import { useDispatch } from "react-redux";
import { setEmail as saveEmail } from "../../store/loginSlice.js";

const LoginEmail = ({ onNext }) => {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();

	function submit() {
		dispatch(saveEmail(email));
		onNext();
	}

	return (
		<Card title="Enter Your Email Address" icon="email-emoji">
			<TextInput
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<div>
				<div className={styles.actionButtonWrapper}>
					<Button onClick={submit} text="Next" />
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
