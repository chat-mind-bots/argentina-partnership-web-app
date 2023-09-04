import React from "react";
import styles from "./round-button.module.css";
interface RoundButtonProps {
	title: string;
	callBack: () => void;
	isActive?: boolean;
	logo?: React.ReactNode;
}

function RoundButton({ logo, callBack, title, isActive }: RoundButtonProps) {
	return (
		<div onClick={callBack} className={styles.button}>
			{logo && (
				<div className={`${styles.logo} ${isActive && styles.active}`}>
					{logo}
				</div>
			)}
			<div className={styles.buttonTitle}>{title}</div>
		</div>
	);
}

export default RoundButton;
