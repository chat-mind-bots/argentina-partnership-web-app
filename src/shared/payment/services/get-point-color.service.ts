import { PaymentStatusEnum } from "shared/payment/interfaces/payment-statuses.enum";

export const getPointColorService = (status: PaymentStatusEnum) => {
	switch (status) {
		case PaymentStatusEnum.PENDING:
		case PaymentStatusEnum.REVIEW:
			return "rgb(201, 148, 0)";
		case PaymentStatusEnum.REJECTED:
			return "red";
		default:
			return null;
	}
};
