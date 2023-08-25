import React, { FC } from "react";
import styles from "./card.module.less";
import { PaymentInterface } from "shared/payment/interfaces/payment.interface";
import { dateToCustomString } from "services/date-formatters";
import { getPaymentStatusService } from "shared/payment/services/get-payment-status.service";
import { getCurrencyTitleService } from "shared/payment/services/get-currency-title.service";
import Point from "shared/components/point";
import { getPointColorService } from "shared/payment/services/get-point-color.service";

const Card: FC<PaymentInterface> = (payment) => {
	return (
		<div className={styles.card}>
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
