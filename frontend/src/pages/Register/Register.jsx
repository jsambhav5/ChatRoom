import React, { useState } from "react";
import styles from "./Register.module.css";
import {
	StepPhoneEmail,
	StepOTP,
	StepName,
	StepUsername,
	StepAvatar,
	StepPassword,
} from "../../components";

const steps = {
	1: StepPhoneEmail,
	2: StepOTP,
	3: StepName,
	4: StepUsername,
	5: StepAvatar,
	6: StepPassword,
};

const Register = () => {
	const [step, setStep] = useState(1);
	const Step = steps[step];

	const onNext = () => {
		if (step < 6) setStep(step + 1);
	};

	return (
		<div>
			<Step onNext={onNext} />
		</div>
	);
};

export default Register;
