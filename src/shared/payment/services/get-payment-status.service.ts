import { PaymentStatusEnum } from "shared/payment/interfaces/payment-statuses.enum";

export const getPaymentStatusService = (status: PaymentStatusEnum): string => {
	switch (status) {
		case PaymentStatusEnum.PENDING:
			return "Ожидает оплаты";

		case PaymentStatusEnum.REVIEW:
			return "Подтверждение оплаты";

		case PaymentStatusEnum.SUCCESS:
			return "Выполнено";

		case PaymentStatusEnum.REJECTED:
			return "Отклонен";

		default:
			return "Неизвестно";
	}
};
