import React, { useState } from "react";
import styles from "./Login.module.css";
import { StepUsernameEmailPhone, StepPassword } from "../../components";

const steps = {
	1: StepUsernameEmailPhone,
	2: StepPassword,
};

const Login = () => {
	const [step, setStep] = useState(1);
	const Step = steps[step];

	const onNext = () => {
		if (step < 2) setStep(step + 1);
	};

	return (
		<div>
			<Step onNext={onNext} />
		</div>
	);
};

export default Login;
