import React, { FC, ReactNode } from "react";
import styles from "./content-layout.module.less";

interface IOwnProps {
	headerPrimary: ReactNode | string;
	headerSecondary?: ReactNode;
	children?: ReactNode;
}

const ContentLayout: FC<IOwnProps> = ({
	children,
	headerSecondary,
	headerPrimary,
}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.headerWrapper}>
				<h2>{headerPrimary}</h2>
				{headerSecondary}
			</div>
			{children}
		</div>
	);
};

export default ContentLayout;
