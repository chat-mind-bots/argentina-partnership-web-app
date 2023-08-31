import { CurrenciesEnum } from "shared/payment/interfaces/currencies.enum";
import { PaymentStatusEnum } from "shared/payment/interfaces/payment-statuses.enum";
import { NetworksEnum } from "shared/payment/interfaces/networks.enum";

export interface CreatePaymentInterface {
	amount: number;
	currency: CurrenciesEnum;
	method?: NetworksEnum;
}
export interface PaymentInterface extends CreatePaymentInterface {
	_id: string;
	status: PaymentStatusEnum;
	user: string;
	balance: string;
	data?: object;
	createdAt: Date;
	updatedAt: Date;
}
