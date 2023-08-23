import React, { FC, useMemo } from "react";
import styles from "shared/home/components/balance/balance.module.less";
import Plus from "public/assets/icons/plus.svg";
import { splitNumber } from "services/splitNumber";

interface IOwnProps {
	amount: number;
}

const Balance: FC<IOwnProps> = ({ amount }) => {
	const { wholePart, hundredths } = useMemo(
		() => splitNumber(amount),
		[amount]
	);

	return (
		<div className={styles.balanceWrapper}>
			<div className={styles.balanceTitle}>Баланс</div>
			<div className={styles.amountWrapper}>
				<span className={styles.amountMain}>{wholePart}</span>
				<span className={styles.amountPortion}>,</span>
				<span className={styles.amountPortion}>{hundredths}</span>
				<span className={`${styles.amountPortion} ${styles.amountPortionLast}`}>
					$
				</span>
				<button className={styles.plusButton}>
					<Plus />
				</button>
			</div>
		</div>
	);
};

export default Balance;
