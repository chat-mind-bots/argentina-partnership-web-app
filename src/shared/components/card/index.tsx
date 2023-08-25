import React, { FC, ReactNode } from "react";
import styles from "./card.module.less";

interface IOwnProps {
	title?: string | ReactNode;
	className?: string;
	children: ReactNode;
}

const Card: FC<IOwnProps> = ({ children, title, className }) => {
	return (
		<div className={`${styles.wrapper} ${className ?? ""}`}>
			{title && <div className={styles.title}>{title}</div>}
			{children}
		</div>
	);
};
export default Card;
