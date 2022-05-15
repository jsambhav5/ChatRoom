import React, { useState } from "react"; //, { useState }
import { Card, Button, BackButton, Loader } from "..";
import styles from "./RegisterSteps.module.css";
import {
	setAvatar as saveAvatar,
	setStep,
	initRegister,
} from "../../store/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../http";
import { setLogin, setUser } from "../../store/loginSlice";

const RegisterAvatar = () => {
	const { email, name, password, avatar } = useSelector(
		(state) => state.register
	);
	const [image, setImage] = useState(avatar);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	function captureImage(e) {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function () {
			setImage(reader.result);
			dispatch(saveAvatar(reader.result));
		};
	}

	async function next() {
		if (!email || !name || !password || !avatar) return;
		setLoading(true);
		try {
			const res = await register({ email, name, password, avatar });
			if (res.status === 201) {
				dispatch(setStep(1));
				dispatch(setLogin(true));
				dispatch(setUser(res.data.user));
				dispatch(initRegister());
			}
			dispatch(setStep(3));
		} catch (error) {
			dispatch(setStep(3));
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	function back() {
		dispatch(setStep(4));
	}

	if (loading)
		return (
			<Loader
				className="container"
				message="Creating Account, Please Wait"
			/>
		);
	return (
		<>
			<Card title={`Okay, ${name}`} icon="monkey-emoji">
				<p className={styles.subHeading}>How’s this photo?</p>
				<div className={styles.avatarWrapper}>
					<img
						className={styles.avatarImage}
						src={image}
						alt="avatar"
					/>
				</div>
				<div>
					<input
						onChange={captureImage}
						id="avatarInput"
						type="file"
					/>
					<label className={styles.inputLabel} htmlFor="avatarInput">
						Choose a Different Photo
					</label>
				</div>
				<div className={styles.actionButtonWrapper}>
					<BackButton onClick={back} text="Back" />
					<Button onClick={next} text="Next" />
				</div>
			</Card>
		</>
	);
};

export default RegisterAvatar;
