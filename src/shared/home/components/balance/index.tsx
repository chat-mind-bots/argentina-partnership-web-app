import React, { FC, useCallback, useMemo } from "react";
import styles from "shared/home/components/balance/balance.module.less";
import Plus from "public/assets/icons/plus.svg";
import { splitNumber } from "services/splitNumber";
import { useNavigate } from "react-router-dom";
import Header from "shared/components/header";

interface IOwnProps {
	amount: number;
}

const Balance: FC<IOwnProps> = ({ amount }) => {
	const { wholePart, hundredths } = useMemo(
		() => splitNumber(amount),
		[amount]
	);

	const navigation = useNavigate();

	const toTopUp = useCallback(() => {
		navigation("/top-up");
	}, [navigation]);

	return (
		<Header title={"Баланс"}>
			<div className={styles.amountWrapper}>
				<span className={styles.amountMain}>{wholePart}</span>
				<span className={styles.amountPortion}>,</span>
				<span className={styles.amountPortion}>{hundredths}</span>
				<span className={`${styles.amountPortion} ${styles.amountPortionLast}`}>
					$
				</span>
				<button className={styles.plusButton} onClick={toTopUp}>
					<Plus />
				</button>
			</div>
		</Header>
	);
};

export default Balance;
