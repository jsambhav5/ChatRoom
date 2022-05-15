import React, { useState } from "react";
import { Card, Button, BackButton, TextInput } from "..";
import styles from "./RegisterSteps.module.css";
import {
	setPassword as savePassword,
	setStep,
} from "../../store/registerSlice";
import { useDispatch, useSelector } from "react-redux";

const RegisterPassword = () => {
	const [password, setPassword] = useState(
		useSelector((state) => state.register.password)
	);
	const dispatch = useDispatch();

	function next() {
		if (!password) return;
		dispatch(savePassword(password));
		dispatch(setStep(5));
	}

	function back() {
		dispatch(setStep(3));
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
				<p className={styles.bottomParagraph}>
					Please choose a Strong Password
				</p>
			</div>
		</Card>
	);
};

export default RegisterPassword;
