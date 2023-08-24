import React, { FC, MouseEventHandler } from "react";
import Flat from "shared/components/flat";
import styles from "./navigation-button.module.less";

interface IOwnProps {
	logo: React.ReactNode;
	children: React.ReactNode;
	onClick?: MouseEventHandler<HTMLDivElement>;
}
const NavigationButton: FC<IOwnProps> = ({ children, logo, onClick }) => {
	return (
		<Flat logo={logo} className={styles.pointer} onClick={onClick}>
			{children}
		</Flat>
	);
};

export default NavigationButton;
