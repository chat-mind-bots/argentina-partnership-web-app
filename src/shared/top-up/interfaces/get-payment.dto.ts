import { PaymentStatusEnum } from "shared/top-up/interfaces/payment-statuses.enum";
import { CurrenciesEnum } from "shared/top-up/interfaces/currencies.enum";

export interface GetPaymentDto {
	limit: number;
	offset: number;
	currency?: CurrenciesEnum;
	status?: PaymentStatusEnum;
}
