import React, { useState } from "react";
// import styles from "./Register.module.css";
import {
	RegisterEmail,
	RegisterOTP,
	RegisterName,
	RegisterPassword,
	RegisterAvatar,
} from "../components";

const steps = {
	1: RegisterEmail,
	2: RegisterOTP,
	3: RegisterName,
	4: RegisterPassword,
	5: RegisterAvatar,
};

const Register = () => {
	const [step, setStep] = useState(1);
	const Step = steps[step];

	const onNext = () => {
		if (step < 5) setStep(step + 1);
	};

	return (
		<div className="cardWrapper">
			<Step onNext={onNext} />
		</div>
	);
};

export default Register;
