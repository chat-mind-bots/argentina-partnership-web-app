import React, { FC, MouseEventHandler } from "react";
import styles from "./flat.module.less";

interface IOwnProps {
	logo: React.ReactNode | string;
	className?: string;
	children: React.ReactNode;
	onClick?: MouseEventHandler<HTMLDivElement>;
}
const Flat: FC<IOwnProps> = ({ logo, children, className, onClick }) => {
	return (
		<div className={`${styles.flat} ${className ?? ""}`} onClick={onClick}>
			<div className={styles.flatContent}>
				<div className={styles.flatLeft}>{logo}</div>
				<div className={styles.flatRight}>{children}</div>
			</div>
		</div>
	);
};

export default Flat;
