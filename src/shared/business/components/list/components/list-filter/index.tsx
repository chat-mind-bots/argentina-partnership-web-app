import React, { Dispatch, SetStateAction, useMemo } from "react";
import Select from "shared/components/select";
import { GetBusinessesInterface } from "shared/business/interfaces/query/get-businesses.interface";
import { Category } from "shared/business/dto/categories.dto";
import { SelectProps } from "shared/business/components/create-business-form";

export interface ListFilterProps {
	categories: Category[];
	params: GetBusinessesInterface;
	setParams: Dispatch<SetStateAction<GetBusinessesInterface>>;
}

const ListFilter = ({ categories, setParams, params }: ListFilterProps) => {
	const categoryOnChange = (value: string) => {
		setParams((prevState) => {
			return { ...prevState, category: value };
		});
	};

	const dataCategory: SelectProps[] = useMemo(
		() =>
			categories.map((category) => ({
				label: category.title,
				value: category._id,
			})),
		[categories]
	);
	return (
		<div>
			<Select
				allowClear
				showSearch
				value={params.category}
				placeholder="Выберете категорию"
				onChange={categoryOnChange}
				options={dataCategory}
			/>
		</div>
	);
};

export default ListFilter;
