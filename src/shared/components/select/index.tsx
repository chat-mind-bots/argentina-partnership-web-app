import React, { useEffect } from "react";
import styles from "./select.module.css";
import { Select as AntdSelect } from "antd";

export interface SelectProps {
	value: string;
	placeholder: string;
	onChange: (str: string) => void;
	options: SelectOption[];
	showSearch?: boolean;
	isEmptyCallback: (value: boolean) => void;
}

export interface SelectOption {
	label: string;
	value: string;
}

const Select = ({
	value,
	placeholder,
	onChange,
	options,
	isEmptyCallback,
}: SelectProps) => {
	useEffect(() => {
		if (value !== "") {
			isEmptyCallback(false);
		} else {
			isEmptyCallback(true);
		}
	}, [value]);
	return (
		<AntdSelect
			showSearch
			className={styles.formSelect}
			value={value}
			placeholder={placeholder}
			optionFilterProp="children"
			onChange={onChange}
			filterOption={(input, option) =>
				(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
			}
			options={options}
		/>
	);
};

export default Select;
