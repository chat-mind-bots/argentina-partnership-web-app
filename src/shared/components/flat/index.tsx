import React, { FC } from "react";
import styles from "./flat.module.less";

interface IOwnProps {
	logo: React.ReactNode | string;
	children: React.ReactNode;
}
const Flat: FC<IOwnProps> = ({ logo, children }) => {
	return (
		<div className={styles.flat}>
			<div className={styles.flatContent}>
				<div className={styles.flatLeft}>{logo}</div>
				<div className={styles.flatRight}>{children}</div>
			</div>
		</div>
	);
};

export default Flat;
