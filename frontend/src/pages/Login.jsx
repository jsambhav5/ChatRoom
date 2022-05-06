import React from "react";
import { LoginEmail, LoginPassword } from "../components";
import { useSelector } from "react-redux";

const steps = {
	1: LoginEmail,
	2: LoginPassword,
};

const Login = () => {
	const step = useSelector((state) => state.login.step);
	const Step = steps[step];

	return (
		<div className="cardWrapper">
			<Step />
		</div>
	);
};

export default Login;
