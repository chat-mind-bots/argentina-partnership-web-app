import React from "react";
import styles from "./round-button.module.css";
interface RoundButtonProps {
	title: string;
	callBack: () => void;
	logo?: React.ReactNode;
}

function RoundButton({ logo, callBack, title }: RoundButtonProps) {
	return (
		<div onClick={callBack} className={styles.button}>
			{logo && <div className={styles.logo}>{logo}</div>}
			<div className={styles.buttonTitle}>{title}</div>
		</div>
	);
}

export default RoundButton;
