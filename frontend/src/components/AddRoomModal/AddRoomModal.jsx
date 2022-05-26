import React, { useState } from "react";
import { TextInput } from "..";
import styles from "./AddRoomModal.module.css";
import { createRoom as create } from "../../http";
import { useNavigate } from "react-router-dom";

const AddRoomModal = ({ onClose }) => {
	const [topic, setTopic] = useState("");
	const [roomType, setRoomType] = useState("open");
	const [footerText, setFooterText] = useState(
		"Start a room, open to everywhere"
	);
	const navigate = useNavigate();

	async function createRoom() {
		try {
			if (!topic) {
				setFooterText("Topic cannot be Empty");
				return;
			}
			const res = await create({ topic, roomType });
			if (res.status === 201) {
				navigate(`/room/${res.data.room.id}`);
			}
		} catch (error) {
			setFooterText("Couldn't create Room");
			console.log(error.message);
		}
	}

	return (
		<div className={styles.modalMask}>
			<div className={styles.modalBody}>
				<button onClick={onClose} className={styles.closeButton}>
					<img src="/images/close.png" alt="close" />
				</button>
				<div className={styles.modalHeader}>
					<h3 className={styles.heading}>Enter the Topic</h3>
					<TextInput
						fullwidth="true"
						type="text"
						value={topic}
						onChange={(e) => {
							setTopic(e.target.value);
						}}
					/>
					<h2 className={styles.subHeading}>Room Types</h2>
					<div className={styles.roomTypes}>
						<div
							onClick={() => {
								setRoomType("open");
							}}
							className={`${styles.typeBox} ${
								roomType === "open" ? styles.active : ""
							}`}
						>
							<img src="/images/globe.png" alt="globe" />
							<span>Open</span>
						</div>
						<div
							onClick={() => {
								setRoomType("social");
							}}
							className={`${styles.typeBox} ${
								roomType === "social" ? styles.active : ""
							}`}
						>
							<img
								style={{ width: 61 }}
								src="/images/social1.png"
								alt="social"
							/>
							<span>Social</span>
						</div>
						<div
							onClick={() => {
								setRoomType("private");
							}}
							className={`${styles.typeBox} ${
								roomType === "private" ? styles.active : ""
							}`}
						>
							<img src="/images/lock.png" alt="lock" />
							<span>Private</span>
						</div>
					</div>
				</div>
				<div className={styles.modalFooter}>
					<h2>{footerText}</h2>
					<button
						onClick={createRoom}
						className={styles.footerButton}
					>
						<img src="/images/celebration.png" alt="celebration" />
						<span>Let's Go</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddRoomModal;
