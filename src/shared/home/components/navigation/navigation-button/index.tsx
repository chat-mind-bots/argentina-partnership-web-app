import React, { FC } from "react";
import Flat from "shared/components/flat";

interface IOwnProps {
	logo: React.ReactNode;
	children: React.ReactNode;
}
const NavigationButton: FC<IOwnProps> = ({ children, logo }) => {
	return <Flat logo={logo}>{children}</Flat>;
};

export default NavigationButton;
