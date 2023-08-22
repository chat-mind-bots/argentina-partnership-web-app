import React from "react";
import Ok from "public/assets/icons/ok.svg";
import styles from "shared/home/components/subscribe/subscribe.module.less";
import Flat from "shared/components/flat";

const Subscribe = () => {
	return (
		<div className={styles.wrapper}>
			<Flat
				logo={
					<div className={styles.logo}>
						<Ok />
					</div>
				}
			>
				<span>Подписка</span>
				<span>135 дней</span>
			</Flat>
		</div>
	);
};

export default Subscribe;
