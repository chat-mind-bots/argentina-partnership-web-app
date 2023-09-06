import React from "react";
import styles from "shared/business/components/list/list.module.less";
import AsyncImage from "shared/components/async-image";
interface BusinessMiniCardProps {
	title: string;
	updateImageState: () => void;
	avgCheck?: number;
	category: string;
	preview?: string;
}

const BusinessMiniCard = ({
	title,
	category,
	updateImageState,
	avgCheck = -1,
	preview,
}: BusinessMiniCardProps) => {
	return (
		<div>
			<div
				className={`${styles.logoWrapper} ${!preview && styles.noLogoWrapper}`}
			>
				{preview ? (
					<AsyncImage
						link={preview}
						alt={preview}
						isLogo
						updateImageState={updateImageState}
					/>
				) : (
					<div className={styles.noLogo}>Без логотипа</div>
				)}
			</div>
			<div className={styles.cardWrapper}>
				<div>{title}</div>
				<div className={styles.cardDescription}>
					<div>{category}</div>
					<div>
						{Array(3)
							.fill(0)
							.map((_, index) => {
								return (
									<span
										className={
											index > avgCheck ? undefined : styles.activeAvgCheck
										}
										key={`card-price--${index}`}
									>
										$
									</span>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BusinessMiniCard;
