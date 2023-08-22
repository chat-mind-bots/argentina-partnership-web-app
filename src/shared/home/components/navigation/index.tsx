import React from "react";
import styles from "shared/home/components/navigation/navigation.module.less";
import Business from "public/assets/icons/business.svg";
import AngleRight from "public/assets/icons/angle-right.svg";
import NavigationButton from "shared/home/components/navigation/navigation-button";

const Navigation = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>Возможности пллатформы</div>
			<NavigationButton
				logo={
					<div className={styles.logo}>
						<Business />
					</div>
				}
			>
				<div className={styles.content}>
					<span>Посмотреть список бизнесов</span>
					<AngleRight />
				</div>
			</NavigationButton>
		</div>
	);
};

export default Navigation;
