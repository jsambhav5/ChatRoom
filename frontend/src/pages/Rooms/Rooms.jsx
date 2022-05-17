import React, { useEffect } from "react";
import styles from "./Rooms.module.css";
import { useDispatch } from "react-redux";
import { setStep as setRegisterStep } from "../../store/registerSlice";
import { setStep as setLoginStep } from "../../store/loginSlice";
import rooms from "./RoomData";
import { RoomCard } from "../../components";

const Rooms = () => {
	const dispatch = useDispatch();

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
					<button className={styles.createRoomButton}>
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
		</div>
	);
};

export default Rooms;
