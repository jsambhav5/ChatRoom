import React, { useState } from "react"; //, { useState }
import { Card, Button, BackButton } from "..";
import styles from "./RegisterSteps.module.css";
import { setAvatar as saveAvatar, setStep } from "../../store/registerSlice";
import { useDispatch } from "react-redux";

const RegisterAvatar = ({ onNext }) => {
	const dispatch = useDispatch();

	function next() {
		// dispatch(savePassword(password));
		dispatch(setStep(1));
	}

	function back() {
		dispatch(setStep(4));
	}

	return (
		<>
			<Card title="Add Avatar" icon="logo">
				<div>
					<div className={styles.actionButtonWrapper}>
						<BackButton onClick={back} text="Back" />
						<Button onClick={next} text="Next" />
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
