import React, { useMemo } from "react";
import Select from "shared/components/select";
import { GetBusinessesInterface } from "shared/business/interfaces/query/get-businesses.interface";
import { Category } from "shared/business/dto/categories.dto";
import { SelectProps } from "shared/business/components/create-business-form";

export interface ListFilterProps {
	list: Category[];
	params: Omit<GetBusinessesInterface, "limit" | "page">;
	onChange: (value: string) => void;
}

const ListFilter = ({ list, params, onChange }: ListFilterProps) => {
	const dataCategory: SelectProps[] = useMemo(
		() =>
			list.map((item) => ({
				label: item.title,
				value: item._id,
			})),
		[list]
	);
	return (
		<div>
			<Select
				allowClear
				showSearch
				value={params.category}
				placeholder="Выберете категорию"
				onChange={onChange}
				options={dataCategory}
			/>
		</div>
	);
};

export default ListFilter;
