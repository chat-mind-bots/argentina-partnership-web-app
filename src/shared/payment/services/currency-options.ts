import { SelectOption } from "shared/components/select";
import { CurrenciesEnum } from "shared/payment/interfaces/currencies.enum";
import { getCurrencyTitleService } from "shared/payment/services/get-currency-title.service";

export const paymentCurrencyOptions: SelectOption[] = [
	{
		label: "-",
		value: "",
	},
	{
		label: getCurrencyTitleService(CurrenciesEnum.USDT),
		value: CurrenciesEnum.USDT,
	},
	{
		label: getCurrencyTitleService(CurrenciesEnum.USD),
		value: CurrenciesEnum.USD,
	},
	{
		label: getCurrencyTitleService(CurrenciesEnum.ARS),
		value: CurrenciesEnum.ARS,
	},
	{
		label: getCurrencyTitleService(CurrenciesEnum.RUB),
		value: CurrenciesEnum.RUB,
	},
];
