import React, { useState } from "react";
import { Card, Button, BackButton, TextInput } from "..";
import styles from "./RegisterSteps.module.css";
import { useSelector, useDispatch } from "react-redux";
import { verifyOTP } from "../../http";
import { setLogin, setUser } from "../../store/loginSlice";
import { setOTP as saveOTP } from "../../store/otpSlice";
import { setStep } from "../../store/registerSlice";

const RegisterOTP = () => {
	const [otp, setOTP] = useState("");
	const { email, hash } = useSelector((state) => state.otp);
	const dispatch = useDispatch();

	async function next() {
		try {
			const res = await verifyOTP({ email, otp, hash });
			if (res.status === 200 && res.data.user !== undefined) {
				dispatch(setLogin(true));
				dispatch(setUser(res.data.user));
				dispatch(setStep(1));
			} else if (res.status === 200) {
				dispatch(setStep(3));
			} else dispatch(setStep(1));
		} catch (error) {
			console.log(error);
			dispatch(setStep(1));
		} finally {
			dispatch(
				saveOTP({
					email: "",
					hash: "",
				})
			);
		}
	}

	function back() {
		dispatch(setStep(1));
	}

	return (
		<>
			<Card title="Enter the OTP" icon="lock-emoji" alt="lock">
				<TextInput
					type="password"
					value={otp}
					onChange={(e) => setOTP(e.target.value)}
				/>
				<div>
					<div className={styles.actionButtonWrapper}>
						<BackButton onClick={back} text="Back" />
						<Button onClick={next} text="Next" />
					</div>
					<p className={styles.bottomParagraph}>
						By entering the OTP, you’re agreeing to our Terms of
						Service and Privacy Policy. Thanks!
					</p>
				</div>
			</Card>
		</>
	);
};

export default RegisterOTP;
