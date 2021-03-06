import React, { useState } from "react";
import { Card, Button, BackButton, TextInput, Loader } from "../";
import { sendOTP } from "../../http";
import styles from "./RegisterSteps.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setOTP } from "../../store/otpSlice";
import { useNavigate, Link } from "react-router-dom";
import { setStep, setEmail as saveEmail } from "../../store/registerSlice";

const RegisterEmail = () => {
	const [text, setText] = useState(
		"By entering your email-id, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!"
	);
	const [title, setTitle] = useState("Enter Your Email Address");
	const [email, setEmail] = useState(
		useSelector((state) => state.register.email)
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	async function next() {
		if (!email) {
			setTitle("Email Cannot be Empty");
			return;
		}
		setLoading(true);
		try {
			setText("Please Wait...  We are sending you the OTP");
			const res = await sendOTP({ email });
			if (res.status === 200) {
				const { email, hash } = res.data;
				dispatch(setOTP({ email, hash }));
				dispatch(saveEmail(email));
				dispatch(setStep(2));
			} else {
				setText("Something went Wrong! Please Try Again");
			}
		} catch (error) {
			setText("Something went Wrong! Please Try Again");
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	}

	function back() {
		navigate("/");
	}

	if (loading)
		return (
			<Loader className="container" message="Sending OTP, Please Wait" />
		);
	return (
		<Card title={title} icon="email-emoji">
			<TextInput
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<div>
				<div className={styles.actionButtonWrapper}>
					<BackButton onClick={back} text="Back" />
					<Button onClick={next} text="Next" />
				</div>
				<p className={styles.bottomParagraph}>{text}</p>
			</div>
			<div className={styles.signInWrapper}>
				<span>Already have an Account?</span>
				<Link className={styles.signInLink} to="/login">
					SignIn
				</Link>
			</div>
		</Card>
	);
};

export default RegisterEmail;
