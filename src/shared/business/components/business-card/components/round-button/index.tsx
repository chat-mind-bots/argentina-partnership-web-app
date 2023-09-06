import React from "react";
import styles from "shared/business/components/business-card/components/round-button/round-button.module.less";
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
