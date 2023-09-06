import React from "react";
import ContentLoader from "react-content-loader";

const ListSkeleton = () => {
	return (
		<ContentLoader
			speed={2}
			width={350}
			height={250}
			viewBox="0 0 350 250"
			backgroundColor="#708599"
			foregroundColor="#232e3c"
		>
			<rect x="4" y="215" rx="4" ry="4" width="301" height="15" />
			<rect x="4" y="236" rx="4" ry="4" width="230" height="13" />
			<rect x="4" y="4" rx="6" ry="6" width="345" height="200" />
		</ContentLoader>
	);
};

export default ListSkeleton;
