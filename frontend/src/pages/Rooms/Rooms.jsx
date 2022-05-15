import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setStep as setRegisterStep } from "../../store/registerSlice";
import { setStep as setLoginStep } from "../../store/loginSlice";
import { hello } from "../../http";
import { Button } from "../../components";

const Rooms = () => {
	const dispatch = useDispatch();
	const [res, setRes] = useState("Rooms");
	useEffect(() => {
		dispatch(setRegisterStep(1));
		dispatch(setLoginStep(1));
	});

	async function click() {
		const response = await hello();
		setRes(response.data);
	}

	return (
		<>
			<div>{res}</div>
			<Button onClick={click}></Button>
		</>
	);
};

export default Rooms;
