import React from "react";
import styles from "./home.module.less";
import Balance from "shared/home/balance";
import Subscribe from "shared/home/subscribe";

export function Component() {
	return (
		<div className={styles.wrapper}>
			<Balance />
			<Subscribe />
		</div>
	);
}
