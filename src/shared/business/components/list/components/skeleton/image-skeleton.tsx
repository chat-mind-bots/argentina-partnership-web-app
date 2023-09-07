import React from "react";
import ContentLoader from "react-content-loader";

const ImageSkeleton = () => {
	return (
		<ContentLoader
			speed={2}
			width={350}
			height={200}
			viewBox="0 0 350 200"
			backgroundColor="#708599"
			foregroundColor="#232e3c"
		>
			<rect x="4" y="4" rx="6" ry="6" width="345" height="200" />
		</ContentLoader>
	);
};

export default ImageSkeleton;
