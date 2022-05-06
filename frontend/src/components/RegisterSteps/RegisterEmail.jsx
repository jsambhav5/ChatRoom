import React, { useState } from "react";
import { Card, Button, BackButton, TextInput } from "../";
import { sendOTP } from "../../http";
import styles from "./RegisterSteps.module.css";
import { useDispatch } from "react-redux";
import { setOTP } from "../../store/otpSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { setStep } from "../../store/registerSlice";

const RegisterEmail = () => {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function next() {
		try {
			// const res = await sendOTP({ email });
			// if (res.status === 200) {
			// const { email, hash } = res.data;
			// dispatch(setOTP({ email, hash }));
			dispatch(setStep(2));
			// }
		} catch (error) {
			console.log(error);
		}
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

export default RegisterEmail;
