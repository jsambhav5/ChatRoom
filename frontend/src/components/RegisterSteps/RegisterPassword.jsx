import React, { useState } from "react";
import { Card, Button, BackButton, TextInput } from "..";
import styles from "./RegisterSteps.module.css";

const RegisterPassword = ({ onNext }) => {
	const [password, setPassword] = useState("");
	return (
		<Card title="Enter Password" icon="logo">
			<TextInput
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<div>
				<div className={styles.actionButtonWrapper}>
					<BackButton onClick={onNext} text="Back" />
					<Button onClick={onNext} text="Next" />
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
