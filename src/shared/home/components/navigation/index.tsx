import React from "react";
import styles from "shared/home/components/navigation/navigation.module.less";
import NavigationButton from "shared/home/components/navigation/navigation-button";

const Navigation = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>Возможности пллатформы</div>
			<NavigationButton text={"Посмотреть список бизнесов"} logo={"logo"} />
		</div>
	);
};

export default Navigation;
