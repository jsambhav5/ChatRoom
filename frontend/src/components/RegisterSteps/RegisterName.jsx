import React, { useState } from "react";
import { Card, Button, TextInput } from "..";
import styles from "./RegisterSteps.module.css";

const RegisterName = ({ onNext }) => {
	const [name, setName] = useState("");
	return (
		<Card title="Enter Your Name" icon="logo">
			<TextInput value={name} onChange={(e) => setName(e.target.value)} />
			<div>
				<div className={styles.actionButtonWrapper}>
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

export default RegisterName;
