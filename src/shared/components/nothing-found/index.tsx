import React, { FC } from "react";
import styles from "./nothing-found.module.less";

interface IOwnProps {
	text?: string;
	className?: string;
}
const NothingFound: FC<IOwnProps> = ({ text, className }) => {
	return (
		<p className={`${styles.text} ${className ?? ""}`}>
			{text ?? "Ничего не найдено"}
		</p>
	);
};

export default NothingFound;
