import React from "react";
import OKLogo from "public/assets/icons/ok.svg";
import styles from "./subscribe.module.less";

const Subscribe = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.flat}>
				<div className={styles.flatContent}>
					<div className={styles.flatLeft}>
						<OKLogo />
					</div>
					<div className={styles.flatRight}>
						<span>Подписка</span>
						<span>135 дней</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Subscribe;
