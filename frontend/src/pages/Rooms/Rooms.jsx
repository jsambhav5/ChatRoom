import React, { useEffect, useState } from "react";
import styles from "./Rooms.module.css";
import { useDispatch } from "react-redux";
import { setStep as setRegisterStep } from "../../store/registerSlice";
import { setStep as setLoginStep } from "../../store/loginSlice";
import { RoomCard, AddRoomModal } from "../../components";
import { getAllRooms } from "../../http";

const Rooms = () => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		const fetchRooms = async () => {
			const { data } = await getAllRooms();
			setRooms(data);
		};
		fetchRooms();
	}, []);

	useEffect(() => {
		dispatch(setRegisterStep(1));
		dispatch(setLoginStep(1));
	});

	return (
		<div className="container">
			<div className={styles.roomsHeader}>
				<div className={styles.headerLeft}>
					<span className={styles.heading}>All Voice Rooms</span>
					<div className={styles.searchBox}>
						<img src="/images/search-icon.png" alt="search" />
						<input className={styles.searchInput} type="text" />
					</div>
				</div>
				<div className={styles.headerRight}>
					<button
						onClick={() => {
							setShowModal(true);
						}}
						className={styles.createRoomButton}
					>
						<img src="/images/add-room-icon.png" alt="add-room" />
						<span>Start a Room</span>
					</button>
				</div>
			</div>
			<div className={styles.roomsList}>
				{rooms.map((room) => (
					<RoomCard key={room.id} room={room} />
				))}
			</div>
			{showModal && (
				<AddRoomModal
					onClose={() => {
						setShowModal(false);
					}}
				/>
			)}
		</div>
	);
};

export default Rooms;
