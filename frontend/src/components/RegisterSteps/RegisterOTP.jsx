import React, { useState } from "react";
import { Card, Button, TextInput } from "..";
import styles from "./RegisterSteps.module.css";
import { useSelector, useDispatch } from "react-redux";
import { verifyOTP } from "../../http";
import { setLogin, setUser } from "../../store/loginSlice";
import { useNavigate } from "react-router-dom";

const RegisterOTP = ({ onNext }) => {
	const [otp, setOTP] = useState("");
	const { email, hash } = useSelector((state) => state.otp);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function submit() {
		try {
			const res = await verifyOTP({ email, otp, hash });
			if (res.status === 200 && res.data.user !== undefined) {
				dispatch(setLogin(true));
				dispatch(setUser(res.data.user));
			}
			onNext();
		} catch (error) {
			console.log(error);
			navigate("/");
		}
	}

	return (
		<>
			<Card title="Enter OTP" icon="lock-emoji" alt="lock">
				<TextInput
					value={otp}
					onChange={(e) => setOTP(e.target.value)}
				/>
				<div>
					<div className={styles.actionButtonWrapper}>
						<Button onClick={submit} text="Next" />
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

export default RegisterOTP;
