import React, { useRef, useState } from "react";
import styles from "shared/components/async-image/async-image.module.css";

interface AsyncImageProps {
	link: string;
	alt: string;
	skeleton?: React.ReactNode;
	isLogo?: boolean;
	updateImageState?: () => void;
}

const AsyncImage = ({
	link,
	alt,
	isLogo,
	skeleton,
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
				className={`${isLogo && styles.logo} ${
					isLoading ? styles.loadingLogo : ""
				}`}
				alt={alt}
				ref={ref}
			/>
			{isLoading && <div className={styles.skeletonWrapper}>{skeleton}</div>}
		</div>
	);
};

export default AsyncImage;
