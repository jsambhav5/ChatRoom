import React from "react"; //, { useState }
import { Card, Button } from "..";
import styles from "./RegisterSteps.module.css";

const RegisterAvatar = ({ onNext }) => {
	return (
		<>
			<Card title="Add Avatar" icon="logo">
				<div>
					<div className={styles.actionButtonWrapper}>
						<Button onClick={onNext} text="Next" />
					</div>
					<p className={styles.bottomParagraph}>
						By entering your email-id, you’re agreeing to our Terms
						of Service and Privacy Policy. Thanks!
					</p>
				</div>
			</Card>
		</>
	);
};

export default RegisterAvatar;
