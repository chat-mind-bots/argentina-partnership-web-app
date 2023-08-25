import React, { FC, ReactNode } from "react";
import styles from "./header.module.less";

interface IOwnProps {
	children?: ReactNode;
	title: string;
	logo?: ReactNode;
}

const Header: FC<IOwnProps> = ({ logo, title, children }) => {
	return (
		<div className={styles.wrapper}>
			{logo && <div className={styles.logo}>{logo}</div>}
			<div className={styles.title}>{title}</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
};

export default Header;
