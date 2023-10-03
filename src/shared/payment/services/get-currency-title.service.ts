import { CurrenciesEnum } from "shared/payment/interfaces/currencies.enum";

export const getCurrencyTitleService = (currency: CurrenciesEnum) => {
	switch (currency) {
		case CurrenciesEnum.ARS:
			return "ARS";

		case CurrenciesEnum.RUB:
			return "RUB";

		case CurrenciesEnum.USD:
			return "USD";

		case CurrenciesEnum.USDT:
			return "USDT";
	}
};
