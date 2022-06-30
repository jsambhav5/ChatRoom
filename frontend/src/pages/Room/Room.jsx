import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useWebRTC from "../../hooks/useWebRTC";
import styles from "./Room.module.css";
import { getRoom } from "../../http";

const Room = () => {
	const { id: roomId } = useParams();
	const { user } = useSelector((state) => state.login);
	const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
	const navigate = useNavigate();
	const [room, setRoom] = useState(null);
	const [isMuted, setMuted] = useState(true);

	useEffect(() => {
		const fetchRoom = async () => {
			const { data } = await getRoom(roomId);
			setRoom(data);
		};

		fetchRoom();
	}, [roomId]);

	useEffect(() => {
		handleMute(isMuted, user.id);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMuted]);

	const handleMuteClick = (clientId) => {
		if (clientId !== user.id) return;
		setMuted((prev) => !prev);
	};

	const leaveRoom = () => {
		navigate("/rooms");
	};

	return (
		<div>
			<div className="container">
				<button onClick={leaveRoom} className={styles.goBack}>
					<img src="/images/arrow-backward.png" alt="back" />
					<span>All Voice Rooms</span>
				</button>
			</div>

			<div className={styles.clientsWrap}>
				<div className={styles.header}>
					<h2 className={styles.topic}>{room?.topic}</h2>
					<div className={styles.actions}>
						<button
							onClick={leaveRoom}
							className={styles.actionButton}
						>
							<img src="/images/win.png" alt="win" />
							<span>Leave Quietly</span>
						</button>
					</div>
				</div>

				<div className={styles.clientsList}>
					{clients.map((client) => {
						return (
							<div key={client.id} className={styles.client}>
								<div className={styles.userHead}>
									<img
										className={styles.userAvatar}
										src={client.avatar}
										alt="avatar"
									/>
									<audio
										autoPlay
										ref={(instance) => {
											provideRef(instance, client.id);
										}}
									/>
									<button
										onClick={() =>
											handleMuteClick(client.id)
										}
										className={styles.micButton}
									>
										{client.muted ? (
											<img
												className={styles.mic}
												src="/images/mic-mute.png"
												alt="mic"
											/>
										) : (
											<img
												className={styles.micImg}
												src="/images/mic.png"
												alt="mic"
											/>
										)}
									</button>
								</div>
								<h4>{client.name}</h4>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Room;
