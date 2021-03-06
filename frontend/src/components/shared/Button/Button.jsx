import React from "react";
import styles from "./Button.module.css";

const NextButton = ({ text, onClick }) => {
	return (
		<button onClick={onClick} className={styles.button}>
			<span>{text}</span>
			<img
				className={styles.rightArrow}
				src="/images/arrow-forward.png"
				alt="arrow"
			/>
		</button>
	);
};

export default NextButton;
