import React, { FC } from "react";

interface IOwnProps {
	color: string;
}

const Point: FC<IOwnProps> = ({ color }) => {
	const pointStyle: React.CSSProperties = {
		width: "5px",
		height: "5px",
		backgroundColor: color,
		borderRadius: "50%",
		display: "inline-block",
	};

	return <div style={pointStyle}></div>;
};

export default Point;
