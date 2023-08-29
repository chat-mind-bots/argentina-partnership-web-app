import React from "react";

interface IDescription {
	children: React.ReactNode;
}

const Description = ({ children }: IDescription) => {
	return <div>{children}</div>;
};

export default Description;
