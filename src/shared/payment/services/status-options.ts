import { SelectOption } from "shared/components/select";
import { PaymentStatusEnum } from "shared/payment/interfaces/payment-statuses.enum";
import { getPaymentStatusService } from "shared/payment/services/get-payment-status.service";

export const paymentStatusOptions: SelectOption[] = [
	{
		label: "-",
		value: "",
	},
	{
		label: getPaymentStatusService(PaymentStatusEnum.PENDING),
		value: PaymentStatusEnum.PENDING,
	},
	{
		label: getPaymentStatusService(PaymentStatusEnum.REVIEW),
		value: PaymentStatusEnum.REVIEW,
	},
	{
		label: getPaymentStatusService(PaymentStatusEnum.SUCCESS),
		value: PaymentStatusEnum.SUCCESS,
	},
	{
		label: getPaymentStatusService(PaymentStatusEnum.REJECTED),
		value: PaymentStatusEnum.REJECTED,
	},
];
