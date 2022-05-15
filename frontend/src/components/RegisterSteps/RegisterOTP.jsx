import React, { useState } from "react";
import { Card, Button, BackButton, TextInput, Loader } from "..";
import styles from "./RegisterSteps.module.css";
import { useSelector, useDispatch } from "react-redux";
import { verifyOTP } from "../../http";
import { setLogin, setUser } from "../../store/loginSlice";
import { setOTP as saveOTP } from "../../store/otpSlice";
import { initRegister, setStep } from "../../store/registerSlice";

const RegisterOTP = () => {
	const [text, setText] = useState(
		"By entering the OTP, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!"
	);
	const [otp, setOTP] = useState("");
	const { email, hash } = useSelector((state) => state.otp);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	async function next() {
		if (!otp) return;
		setLoading(true);
		try {
			const res = await verifyOTP({ email, otp, hash });
			if (res.status === 200 && res.data.user !== undefined) {
				dispatch(setLogin(true));
				dispatch(setUser(res.data.user));
				dispatch(setStep(1));
				dispatch(initRegister());
			} else if (res.status === 200) {
				dispatch(setStep(3));
			} else {
				setText(
					"OTP Wrong or Expired. Please Check OTP or Go Back and Resend OTP"
				);
			}
		} catch (error) {
			setText(
				"OTP Wrong or Expired. Please Check OTP or Go Back and Resend OTP"
			);
		} finally {
			dispatch(saveOTP({ email: "", hash: "" }));
			setLoading(false);
		}
	}

	function back() {
		dispatch(setStep(1));
	}

	if (loading)
		return (
			<Loader
				className="container"
				message="Verifying OTP, Please Wait"
			/>
		);
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
					<p className={styles.bottomParagraph}>{text}</p>
				</div>
			</Card>
		</>
	);
};

export default RegisterOTP;
