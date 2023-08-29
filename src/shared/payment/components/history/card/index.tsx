import React, { FC, lazy, Suspense, useState } from "react";
import styles from "./card.module.less";
import { PaymentInterface } from "shared/payment/interfaces/payment.interface";
import { dateToCustomString } from "services/date-formatters";
import { getPaymentStatusService } from "shared/payment/services/get-payment-status.service";
import { getCurrencyTitleService } from "shared/payment/services/get-currency-title.service";
import Point from "shared/components/point";
import { getPointColorService } from "shared/payment/services/get-point-color.service";
import Modal from "shared/components/modal";
import PageLoader from "shared/components/page-loader";

const Info = lazy(() => import("shared/payment/components/payment/info"));

const Card: FC<PaymentInterface & { userId: string; reLoad(): void }> = (
	payment
) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className={styles.card} onClick={handleModal}>
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
			<Modal
				isOpen={isOpen}
				onClose={handleModal}
				title={"Информация о платеже"}
			>
				{isOpen && (
					<Suspense fallback={<PageLoader />}>
						<Info
							{...payment}
							onClose={() => {
								handleModal();
								payment.reLoad();
							}}
						/>
					</Suspense>
				)}
			</Modal>
		</>
	);
};

export default Card;
