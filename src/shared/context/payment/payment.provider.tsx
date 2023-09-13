import React, { FC, ReactNode, useState } from "react";
import { PaymentContext } from "shared/context/payment/payment.context";
import { getMyPaymentsCount } from "shared/context/payment/services/payment-data.service";
import { PaymentStatusEnum } from "shared/payment/interfaces/payment-statuses.enum";

interface IOwnProps {
	children: ReactNode;
}
const PaymentProvider: FC<IOwnProps> = ({ children }) => {
	const [payments, setPayments] = useState<number>(0);

	const paymentHandler = async () => {
		const total = await getMyPaymentsCount({
			status: PaymentStatusEnum.PENDING,
		});
		setPayments(total);
	};

	return (
		<PaymentContext.Provider
			value={{ payments, updatePayments: paymentHandler }}
			children={children}
		/>
	);
};

export default PaymentProvider;
