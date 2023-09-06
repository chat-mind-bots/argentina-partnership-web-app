import React, { useEffect, useRef, useState } from "react";
import styles from "shared/components/async-image/async-image.module.css";

interface AsyncImageProps {
	link: string;
	alt: string;
	isLogo?: boolean;
	updateImageState?: () => void;
}

const AsyncImage = ({
	link,
	alt,
	isLogo,
	updateImageState,
}: AsyncImageProps) => {
	const ref = useRef<HTMLImageElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	// const onLoadHandler = () => {
	// 	if (ref.current) {
	// 		setIsLoading(!ref.current.complete && !(ref.current.naturalHeight !== 0));
	// 	}
	// };
	//

	return (
		<div>
			<img
				src={link}
				onLoad={() => {
					if (ref.current) {
						const load =
							ref.current.complete && ref.current.naturalHeight !== 0;
						if (load) {
							updateImageState && updateImageState();
							setIsLoading(false);
						}
					}
				}}
				// onLoadStart={() => {
				// }}
				loading={"lazy"}
				className={`${isLogo && styles.logo}`}
				alt={alt}
				ref={ref}
			/>
		</div>
	);
};

export default AsyncImage;
