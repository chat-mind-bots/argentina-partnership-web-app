import React from "react";
import styles from "./ellipsis.module.css";

interface EllipsisProps {
	children: React.ReactNode;
}

const Ellipsis = ({ children }: EllipsisProps) => {
	return <div className={styles.wrapper}>{children}</div>;
};

export default Ellipsis;
