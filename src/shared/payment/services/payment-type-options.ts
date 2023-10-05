import { SelectOption } from "shared/components/select";
import { PaymentTypeEnum } from "shared/payment/interfaces/payment-type.enum";
import { getPaymentTypeTitle } from "shared/payment/services/get-payment-type-title";

export const paymentTypeOptions: SelectOption[] = [
	// {
	// 	label: getPaymentTypeTitle(PaymentTypeEnum.CRYPTOMUS),
	// 	value: PaymentTypeEnum.CRYPTOMUS,
	// },
	{
		label: getPaymentTypeTitle(PaymentTypeEnum.MANUAL),
		value: PaymentTypeEnum.MANUAL,
	},
];
