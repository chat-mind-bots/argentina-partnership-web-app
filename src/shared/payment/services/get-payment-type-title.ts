import { NetworksEnum } from "shared/payment/interfaces/networks.enum";
import { PaymentTypeEnum } from "shared/payment/interfaces/payment-type.enum";

export const getPaymentTypeTitle = (paymentType: PaymentTypeEnum) => {
	switch (paymentType) {
		case PaymentTypeEnum.MANUAL:
			return "Ручной перевод";
		case PaymentTypeEnum.CRYPTOMUS:
			return "Cryptomus";
	}
};

export const getPaymentTypeDescription = (paymentType: PaymentTypeEnum) => {
	switch (paymentType) {
		case PaymentTypeEnum.MANUAL:
			return "Ручной перевод обрабатывается в течение 12ч";
		case PaymentTypeEnum.CRYPTOMUS:
			return "Средства зачисляются автоматически после успешного платежа";
	}
};
