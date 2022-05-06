import React, { useState } from "react";
import { Card, Button, BackButton, TextInput } from "..";
import styles from "./RegisterSteps.module.css";
import {
	setPassword as savePassword,
	setStep,
} from "../../store/registerSlice";
import { useDispatch } from "react-redux";

const RegisterPassword = () => {
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	function next() {
		dispatch(savePassword(password));
		dispatch(setStep(5));
	}

	function back() {
		dispatch(setStep(3));
	}

	return (
		<Card title="Enter Password" icon="logo">
			<TextInput
				value={password}
				onChange={(e) => setPassword(e.target.value)}
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

export default RegisterPassword;
