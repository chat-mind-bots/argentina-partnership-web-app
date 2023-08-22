import React from "react";
// import OKLogo from "public/assets/icons/ok.svg";
import styles from "shared/home/components/subscribe/subscribe.module.less";
import Flat from "shared/components/flat";

const Subscribe = () => {
	return (
		<div className={styles.wrapper}>
			<Flat logo={"Logo"}>
				<span>Подписка</span>
				<span>135 дней</span>
			</Flat>
		</div>
	);
};

export default Subscribe;
