import React, { FC } from "react";
import { IFiltersForm } from "shared/payment/components/history/index";
import Select from "shared/components/select";
import { paymentStatusOptions } from "shared/payment/services/status-options";
import { paymentCurrencyOptions } from "shared/payment/services/currency-options";
import ContentLayout from "shared/components/content-layout";

interface IOwnProps {
	filters: IFiltersForm;
	statusHandler: (status: string) => void;
	currencyHandler: (currency: string) => void;
}
const FilterForm: FC<IOwnProps> = ({
	filters,
	currencyHandler,
	statusHandler,
}) => {
	return (
		<div>
			<ContentLayout headerPrimary={"Выбрать статус платежа"}>
				<Select
					value={filters.status as string}
					placeholder={"Выберите статус"}
					onChange={statusHandler}
					options={paymentStatusOptions}
				></Select>
			</ContentLayout>

			<ContentLayout headerPrimary={"Выбрать валюту платежа"}>
				<Select
					value={filters.currency as string}
					placeholder={"Выберите валюту"}
					onChange={currencyHandler}
					options={paymentCurrencyOptions}
				></Select>
			</ContentLayout>
		</div>
	);
};
export default FilterForm;
