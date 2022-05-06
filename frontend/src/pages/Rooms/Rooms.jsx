import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStep as setRegisterStep } from "../../store/registerSlice";
import { setStep as setLoginStep } from "../../store/loginSlice";

const Rooms = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setRegisterStep(1));
		dispatch(setLoginStep(1));
	});
	return <div>Rooms</div>;
};

export default Rooms;
