import express from "express";
import { BASE_URL, FRONT_END_PORT, BACK_END_PORT, ACTIONS } from "./config";
import { authRouter, userRouter, roomRouter } from "./routes";
import { DatabaseService } from "./services";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AuthMiddleware } from "./middlewares";

const corsConfig = {
	origin: [`${BASE_URL}:${FRONT_END_PORT}`],
	credentials: true,
};

const app = express();
app.use(cookieParser());
DatabaseService.connect();

app.use(cors(corsConfig));
app.use(express.json({ limit: "10mb" }));
app.use("/storage", express.static("storage"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/rooms", AuthMiddleware.userAuth, roomRouter);

app.get("/", (req, res) => {
	res.send("Hello from express Js");
});

app.listen(BACK_END_PORT, () =>
	console.log(`Listening on Port ${BACK_END_PORT}`)
);
