import { PaymentStatusEnum } from "shared/payment/interfaces/payment-statuses.enum";
import { CurrenciesEnum } from "shared/payment/interfaces/currencies.enum";

export interface GetPaymentDto {
	limit: number;
	offset: number;
	currency?: CurrenciesEnum;
	status?: PaymentStatusEnum;
}
