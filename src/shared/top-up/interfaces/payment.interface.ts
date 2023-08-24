import { CurrenciesEnum } from "shared/top-up/interfaces/currencies.enum";
import { PaymentStatusEnum } from "shared/top-up/interfaces/payment-statuses.enum";
import { NetworksEnum } from "shared/top-up/interfaces/networks.enum";

export interface CreatePaymentInterface {
	amount: number;
	currency: CurrenciesEnum;
	method: NetworksEnum;
}
export interface PaymentInterface extends CreatePaymentInterface {
	_id: string;
	status: PaymentStatusEnum;
	user: string;
	balance: string;
	createdAt: Date;
	updatedAt: Date;
}
