import React, { useState } from "react";
import { Card, Button, BackButton, TextInput } from "..";
import styles from "./RegisterSteps.module.css";
import { setName as saveName, setStep } from "../../store/registerSlice";
import { useDispatch, useSelector } from "react-redux";

const RegisterName = () => {
	const [name, setName] = useState(
		useSelector((state) => state.register.name)
	);
	const [title, setTitle] = useState("What's Your Full Name");
	const dispatch = useDispatch();

	function next() {
		if (!name) {
			setTitle("Name Cannot be Empty");
			return;
		}
		dispatch(saveName(name));
		dispatch(setStep(4));
	}

	function back() {
		dispatch(setStep(1));
	}

	return (
		<Card title={title} icon="goggle-emoji">
			<p className={styles.subHeading}>
				People use real names at ChatRoom 😅
			</p>
			<TextInput
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<div>
				<div className={styles.actionButtonWrapper}>
					<BackButton onClick={back} text="Back" />
					<Button onClick={next} text="Next" />
				</div>
			</div>
		</Card>
	);
};

export default RegisterName;
