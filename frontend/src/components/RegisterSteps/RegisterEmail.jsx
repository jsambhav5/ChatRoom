import React, { useState } from "react";
import { Card, Button, BackButton, TextInput } from "../";
import { sendOTP } from "../../http";
import styles from "./RegisterSteps.module.css";
import { useDispatch } from "react-redux";
import { setOTP } from "../../store/otpSlice";

const RegisterEmail = ({ onNext }) => {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();

	async function submit() {
		try {
			const res = await sendOTP({ email });
			if (res.status === 200) {
				const { email, hash } = res.data;
				dispatch(setOTP({ email, hash }));
				onNext();
			}
		} catch (error) {}
	}

	return (
		<Card title="Enter Your Email Address" icon="email-emoji">
			<TextInput
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<div>
				<div className={styles.actionButtonWrapper}>
					<BackButton onClick={onNext} text="Back" />
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

export default RegisterEmail;
