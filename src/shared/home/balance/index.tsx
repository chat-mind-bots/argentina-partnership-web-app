import React from "react";
import styles from "shared/home/balance/balance.module.less";

const Balance = () => {
	return (
		<div className={styles.balanceWrapper}>
			<div className={styles.balanceTitle}>Баланс</div>
			<div className={styles.amountWrapper}>
				<span className={styles.amountMain}>0</span>
				<span className={styles.amountPortion}>,</span>
				<span className={styles.amountPortion}>00</span>
				<button className={styles.plusButton}>
					<svg
						width="23"
						height="22"
						viewBox="0 0 23 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							x="0.5"
							width="22"
							height="22"
							rx="11"
							fill="var(--tg-theme-link-color)"
						></rect>
						<path
							d="M11.5 5.857v10.286M16.643 11H6.357"
							stroke="var(--tg-theme-secondary-bg-color)"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
				</button>
			</div>
		</div>
		// <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" width="22" height="22" rx="11" fill="var(--tg-theme-link-color)"></rect><path d="M11.5 5.857v10.286M16.643 11H6.357" stroke="var(--tg-theme-secondary-bg-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
	);
};

export default Balance;
