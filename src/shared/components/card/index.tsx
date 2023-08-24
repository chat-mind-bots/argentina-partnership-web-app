import React, { FC, ReactNode } from "react";
import styles from "./card.module.less";

interface IOwnProps {
	title?: string | ReactNode;
	children: ReactNode;
}

const Card: FC<IOwnProps> = ({ children, title }) => {
	return (
		<div className={styles.wrapper}>
			{title && <div className={styles.title}>{title}</div>}
			{children}
		</div>
	);
};
export default Card;
