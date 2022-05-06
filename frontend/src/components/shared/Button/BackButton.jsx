import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, onClick }) => {
	return (
		<button onClick={onClick} className={styles.button}>
			<img
				className={styles.leftArrow}
				src="/images/arrow-backward.png"
				alt="arrow"
			/>
			<span>{text}</span>
		</button>
	);
};

export default Button;
