import React, { FC } from "react";
import styles from "shared/payment/components/payment/info/info.module.less";
import { PaymentInterface } from "shared/payment/interfaces/payment.interface";
import { getCurrencyTitleService } from "shared/payment/services/get-currency-title.service";
import { dateToCustomString } from "services/date-formatters";
import { getPointColorService } from "shared/payment/services/get-point-color.service";
import Point from "shared/components/point";
import { getPaymentStatusService } from "shared/payment/services/get-payment-status.service";
import { PaymentStatusEnum } from "shared/payment/interfaces/payment-statuses.enum";
import PayInstruction from "shared/payment/components/payment/pay-instruction";

const Info: FC<PaymentInterface & { onClose(): void; userId: string }> = (
	payment
) => {
	return (
		<div className={styles.list}>
			<div className={styles.row}>
				<span className={styles.title}>Статус</span>
				<span className={styles.description}>
					{getPaymentStatusService(payment.status)}
					{getPointColorService(payment.status) && (
						<Point color={getPointColorService(payment.status) as string} />
					)}
				</span>
			</div>
			<div className={styles.row}>
				<span className={styles.title}>Дата</span>
				<span className={styles.description}>
					{dateToCustomString(new Date(payment.createdAt))}
				</span>
			</div>
			<div className={styles.row}>
				<span className={styles.title}>Сумма пополнения</span>
				<span className={styles.description}>{payment.amount}</span>
			</div>
			<div className={styles.row}>
				<span className={styles.title}>Валюта</span>
				<span className={styles.description}>
					{getCurrencyTitleService(payment.currency)}
				</span>
			</div>
			{payment.status === PaymentStatusEnum.PENDING && payment.method && (
				<PayInstruction
					paymentId={payment._id}
					onClose={payment.onClose}
					method={payment.method}
					userId={payment.userId}
				/>
			)}
		</div>
	);
};

export default Info;
