import React, { useState } from "react";
import { LoginEmail, LoginPassword } from "../components";

const steps = {
	1: LoginEmail,
	2: LoginPassword,
};

const Login = () => {
	const [step, setStep] = useState(1);
	const Step = steps[step];

	const onNext = () => {
		if (step < 2) setStep(step + 1);
	};

	return (
		<div className="cardWrapper">
			<Step onNext={onNext} />
		</div>
	);
};

export default Login;
