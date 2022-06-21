import express from "express";
import { BASE_URL, FRONT_END_PORT, BACK_END_PORT, ACTIONS } from "./config";
import { authRouter, userRouter, roomRouter } from "./routes";
import { DatabaseService } from "./services";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AuthMiddleware } from "./middlewares";
import http from "http";
import socketIO from "socket.io";

const corsConfig = {
	origin: [`${BASE_URL}:${FRONT_END_PORT}`],
	credentials: true,
};

const app = express();
app.use(cookieParser());
DatabaseService.connect();

const server = http.createServer(app);
const io = socketIO(server, {
	cors: {
		origin: [`${BASE_URL}:${FRONT_END_PORT}`],
		methods: ["GET", "POST"],
	},
});

app.use(cors(corsConfig));
app.use(express.json({ limit: "10mb" }));
app.use("/storage", express.static("storage"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/rooms", AuthMiddleware.userAuth, roomRouter);

app.get("/", (req, res) => {
	res.send("Hello from express Js");
});

const socketUserMap = {};

io.on("connection", (socket) => {
	console.log("New Connection: ", socket.id);

	socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
		socketUserMap[socket.id] = user;

		const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
		clients.forEach((clientId) => {
			io.to(clientId).emit(ACTIONS.ADD_PEER, {
				peerId: socket.id,
				createOffer: false,
				user,
			});

			socket.emit(ACTIONS.ADD_PEER, {
				peerId: clientId,
				createOffer: true,
				user: socketUserMap[clientId],
			});
		});

		socket.join(roomId);
	});

	// Handle relay-ice
	socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
		io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
			peerId: socket.id,
			icecandidate,
		});
	});

	// Handle relay sdp (session description)
	socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
		io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
			peerId: socket.id,
			sessionDescription,
		});
	});

	// Leaving the room
	const leaveRoom = ({ roomId }) => {
		const { rooms } = socket;

		Array.from(rooms).forEach((roomId) => {
			const clients = Array.from(
				io.sockets.adapter.rooms.get(roomId) || []
			);

			clients.forEach((clientId) => {
				io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
					peerId: socket.id,
					userId: socketUserMap[socket.id]
						? socketUserMap[socket.id].id
						: undefined,
				});

				socket.emit(ACTIONS.REMOVE_PEER, {
					peerId: clientId,
					userId: socketUserMap[clientId]
						? socketUserMap[clientId].id
						: undefined,
				});
			});
			socket.leave(roomId);
		});

		delete socketUserMap[socket.id];
	};

	socket.on(ACTIONS.LEAVE, leaveRoom);
	socket.on("disconnecting", leaveRoom);
});

server.listen(BACK_END_PORT, () =>
	console.log(`Listening on Port ${BACK_END_PORT}`)
);
