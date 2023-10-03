import { CurrenciesEnum } from "shared/payment/interfaces/currencies.enum";
import { PaymentStatusEnum } from "shared/payment/interfaces/payment-statuses.enum";
import { NetworksEnum } from "shared/payment/interfaces/networks.enum";
import { PaymentTypeEnum } from "shared/payment/interfaces/payment-type.enum";

export interface CreatePaymentInterface {
	amount: number;
	currency: CurrenciesEnum;
	paymentType: PaymentTypeEnum;
	method?: NetworksEnum;
}

interface DataInterface {
	uuid?: string;
	payment_link?: string;
	txId?: string;
}

export interface PaymentInterface extends CreatePaymentInterface {
	_id: string;
	status: PaymentStatusEnum;
	user: string;
	balance: string;
	data?: DataInterface;
	createdAt: Date;
	updatedAt: Date;
}

export interface PaymentInterfaceDto {
	data: PaymentInterface[];
	total: number;
}
