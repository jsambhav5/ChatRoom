import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./";
import socketInit from "../sockets";
import { ACTIONS } from "../config";
import freeice from "freeice";

export default function useWebRTC(roomId, user) {
	const [clients, setClients] = useStateWithCallback([]);
	const audioElements = useRef({});
	const connections = useRef({});
	const localMediaStream = useRef(null);
	const socket = useRef(null);
	const clientsRef = useRef(null);

	const addNewClient = useCallback(
		(newClient, cb) => {
			const lookingFor = clients.find(
				(client) => client.id === newClient.id
			);

			if (lookingFor === undefined) {
				setClients(
					(existingClients) => [...existingClients, newClient],
					cb
				);
			}
		},
		[clients, setClients]
	);

	useEffect(() => {
		clientsRef.current = clients;
	}, [clients]);

	useEffect(() => {
		socket.current = socketInit();
	}, []);

	// capture audio
	useEffect(() => {
		const startCapture = async () => {
			localMediaStream.current =
				await navigator.mediaDevices.getUserMedia({
					audio: true,
				});
		};

		startCapture().then(() => {
			addNewClient({ ...user, muted: true }, () => {
				const localAudioElement = audioElements.current[user.id];

				if (localAudioElement) {
					localAudioElement.volume = 100;
					localAudioElement.srcObject = localMediaStream.current;
				}
			});

			// socket emit JOIN using socket-io
			socket.current.emit(ACTIONS.JOIN, { roomId, user });
		});

		return () => {
			// leaving the room
			localMediaStream.current
				.getTracks()
				.forEach((track) => track.stop());

			socket.current.emit(ACTIONS.LEAVE, { roomId });
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const handleNewPeer = async ({
			peerId,
			createOffer,
			user: remoteUser,
		}) => {
			if (peerId in connections.current) {
				return console.warn(
					`You are already conncted with ${peerId}: (${user.name})`
				);
			}

			connections.current[peerId] = new RTCPeerConnection({
				iceServers: freeice(),
			});

			// Handle new Ice-candidate
			connections.current[peerId].onicecandidate = (event) => {
				socket.current.emit(ACTIONS.RELAY_ICE, {
					peerId,
					icecandidate: event.candidate,
				});
			};

			// Handle on track on this connection
			connections.current[peerId].ontrack = ({
				streams: [remoteStream],
			}) => {
				addNewClient({ ...remoteUser, muted: true }, () => {
					if (audioElements.current[remoteUser.id]) {
						audioElements.current[remoteUser.id].srcObject =
							remoteStream;
					} else {
						let settled = false;
						const interval = setInterval(() => {
							if (audioElements.current[remoteUser.id]) {
								audioElements.current[remoteUser.id].srcObject =
									remoteStream;
								settled = true;
							}

							if (settled) {
								clearInterval(interval);
							}
						}, 1000);
					}
				});
			};

			// Add local track to remote connections
			localMediaStream.current.getTracks().forEach((track) => {
				connections.current[peerId].addTrack(
					track,
					localMediaStream.current
				);
			});

			// Create Offer
			if (createOffer) {
				const offer = await connections.current[peerId].createOffer();

				await connections.current[peerId].setLocalDescription(offer);

				// send offer to another client
				socket.current.emit(ACTIONS.RELAY_SDP, {
					peerId,
					sessionDescription: offer,
				});
			}
		};

		socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

		return () => {
			socket.current.off(ACTIONS.ADD_PEER);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Handle Ice-Candidate
	useEffect(() => {
		socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
			if (icecandidate) {
				connections.current[peerId].addIceCandidate(icecandidate);
			}
		});

		return () => {
			socket.current.off(ACTIONS.ICE_CANDIDATE);
		};
	}, []);

	// Handle SDP
	useEffect(() => {
		const handleRemoteSDP = async ({
			peerId,
			sessionDescription: remoteSessionDescription,
		}) => {
			connections.current[peerId].setRemoteDescription(
				new RTCSessionDescription(remoteSessionDescription)
			);

			// if session description is type of an offer, create an answer

			if (remoteSessionDescription.type === "offer") {
				const connection = connections.current[peerId];
				const answer = await connection.createAnswer();

				connection.setLocalDescription(answer);

				socket.current.emit(ACTIONS.RELAY_SDP, {
					peerId,
					sessionDescription: answer,
				});
			}
		};

		socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSDP);

		return () => {
			socket.current.off(ACTIONS.SESSION_DESCRIPTION);
		};
	}, []);

	// Handle remove peer
	useEffect(() => {
		const handleRemovePeer = async ({ peerId, userId }) => {
			if (connections.current[peerId]) {
				connections.current[peerId].close();
			}

			delete connections.current[peerId];
			delete audioElements.current[peerId];
			setClients((list) => list.filter((client) => client.id !== userId));
		};

		socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

		return () => {
			socket.current.off(ACTIONS.REMOVE_PEER);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Listen for Mute/Unmute
	useEffect(() => {
		socket.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
			setMuted(true, userId);
		});

		socket.current.on(ACTIONS.UNMUTE, ({ peerId, userId }) => {
			setMuted(false, userId);
		});

		const setMuted = (mute, userId) => {
			const clientIndex = clientsRef.current
				.map((client) => client.id)
				.indexOf(userId);

			const connetedClients = JSON.parse(
				JSON.stringify(clientsRef.current)
			);

			if (clientIndex > -1) {
				connetedClients[clientIndex].muted = mute;
				setClients(connetedClients);
			}
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const provideRef = (instance, userId) => {
		audioElements.current[userId] = instance;
	};

	// Handling Mute
	const handleMute = (isMuted, userId) => {
		let settled = false;

		let interval = setInterval(() => {
			if (localMediaStream.current) {
				localMediaStream.current.getTracks()[0].enabled = !isMuted;
				if (isMuted) {
					socket.current.emit(ACTIONS.MUTE, {
						roomId,
						userId: user.id,
					});
				} else {
					socket.current.emit(ACTIONS.UNMUTE, {
						roomId,
						userId: user.id,
					});
				}
				settled = true;
			}
			if (settled) {
				clearInterval(interval);
			}
		}, 200);
	};

	return { clients, provideRef, handleMute };
}
