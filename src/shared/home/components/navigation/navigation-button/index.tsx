import React, { FC } from "react";
import Flat from "shared/components/flat";

interface IOwnProps {
	logo: string;
	text: string;
}
const NavigationButton: FC<IOwnProps> = ({ text, logo }) => {
	return <Flat logo={logo}>{text}</Flat>;
};

export default NavigationButton;
