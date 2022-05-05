import express from "express";
import { BASE_URL, FRONT_END_PORT, BACK_END_PORT, ACTIONS } from "./config";
import { authRouter, userRouter, roomRouter } from "./routes";
import { DatabaseService } from "./services";
import cors from "cors";

const corsConfig = {
	origin: [`${BASE_URL}:${FRONT_END_PORT}`],
	credentials: true,
};

const app = express();

DatabaseService.connect();
app.use(cors(corsConfig));
app.use(express.json());
app.use("/storage", express.static("storage"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/rooms", roomRouter);

app.get("/", (req, res) => {
	res.send("Hello from express Js");
});

app.listen(BACK_END_PORT, () =>
	console.log(`Listening on Port ${BACK_END_PORT}`)
);
