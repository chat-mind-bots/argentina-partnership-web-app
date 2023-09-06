import React, { FC } from "react";
import styles from "./card.module.less";
import { PaymentInterface } from "shared/payment/interfaces/payment.interface";
import { dateToCustomString } from "services/date-formatters";
import { getPaymentStatusService } from "shared/payment/services/get-payment-status.service";
import { getCurrencyTitleService } from "shared/payment/services/get-currency-title.service";
import Point from "shared/components/point";
import { getPointColorService } from "shared/payment/services/get-point-color.service";
import { useNavigate } from "react-router-dom";

const Card: FC<PaymentInterface & { userId: string; reLoad(): void }> = (
	payment
) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/payment/${payment._id}`);
	};

	return (
		<div className={styles.card} onClick={handleClick}>
			<div className={`${styles.column} ${styles.columnLeft}`}>
				<div className={styles.columnTitle}>
					Пополнение {getCurrencyTitleService(payment.currency)}
				</div>
				<span className={styles.columnSecondary}>
					{dateToCustomString(new Date(payment.createdAt))}
				</span>
			</div>
			<div className={`${styles.column} ${styles.columnRight}`}>
				<div className={styles.columnTitle}>
					{payment.amount} {getCurrencyTitleService(payment.currency)}
				</div>
				<div className={styles.columnSecondary}>
					<div>{getPaymentStatusService(payment.status)}</div>
					{getPointColorService(payment.status) && (
						<Point color={getPointColorService(payment.status) as string} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
