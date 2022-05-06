import React from "react";
import { useSelector } from "react-redux";

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
	const step = useSelector((state) => state.register.step);
	const Step = steps[step];

	return (
		<div className="cardWrapper">
			<Step />
		</div>
	);
};

export default Register;
