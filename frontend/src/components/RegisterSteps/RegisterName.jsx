import React, { useState } from "react";
import { Card, Button, BackButton, TextInput } from "..";
import styles from "./RegisterSteps.module.css";
import { setName as saveName, setStep } from "../../store/registerSlice";
import { useDispatch } from "react-redux";

const RegisterName = () => {
	const [name, setName] = useState("");
	const dispatch = useDispatch();

	function next() {
		dispatch(saveName(name));
		dispatch(setStep(4));
	}

	function back() {
		dispatch(setStep(1));
	}

	return (
		<Card title="Enter Your Name" icon="logo">
			<TextInput value={name} onChange={(e) => setName(e.target.value)} />
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

export default RegisterName;
