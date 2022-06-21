import { BASE_URL, BACK_END_PORT } from "../config";
import { io } from "socket.io-client";

export default function socketInit() {
	const options = {
		"force new connection": true,
		reconnectionAttempts: "Infinity",
		timeout: 10000,
		transports: ["websocket"],
	};

	return io(`${BASE_URL}:${BACK_END_PORT}`, options);
}
