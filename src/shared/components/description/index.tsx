import React, { FC, ReactNode } from "react";
import styles from "./description.module.less";

interface IOwnProps {
	primary: string | ReactNode;
	secondary?: string | ReactNode;
}

const Description: FC<IOwnProps> = ({ primary, secondary }) => {
	return (
		<div className={styles.stepDescription}>
			<div className={styles.stepDescriptionTitle}>{primary}</div>
			<div>{secondary}</div>
		</div>
	);
};

export default Description;
