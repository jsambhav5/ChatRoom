import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, BACK_END_PORT } from "../config";
import { useDispatch } from "react-redux";
import { setLogin, setUser } from "../store/loginSlice";
import { setEmail, setStep } from "../store/registerSlice";

export default function useLoadingWithRefresh() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.post(
					`${BASE_URL}:${BACK_END_PORT}/api/auth/refresh`,
					{},
					{
						withCredentials: true,
					}
				);
				if (data.user) {
					dispatch(setLogin(true));
					dispatch(setUser(data.user));
				} else if (data.email) {
					dispatch(setEmail(data.email));
					dispatch(setStep(3));
				}
			} catch (error) {
				console.log(error.message);
			} finally {
				setLoading(false);
			}
		})(); // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { loading };
}
