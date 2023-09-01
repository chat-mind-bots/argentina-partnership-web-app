import React from "react";
import styles from "shared/business/components/list/list.module.less";
interface BusinessMiniCardProps {
	title: string;
	avgCheck?: number;
	category: string;
	preview?: string;
}

const BusinessMiniCard = ({
	title,
	category,
	avgCheck = -1,
	preview,
}: BusinessMiniCardProps) => {
	return (
		<div>
			<div
				className={`${styles.logoWrapper} ${!preview && styles.noLogoWrapper}`}
			>
				{preview ? (
					<img src={preview} alt={preview} className={styles.logo} />
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
