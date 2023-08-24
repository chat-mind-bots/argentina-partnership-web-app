import React, { FC } from "react";
import styles from "./select.module.css";
import { Select as AntdSelect } from "antd";

export interface SelectProps {
	value: string;
	placeholder: string;
	onChange: (str: string) => void;
	options: SelectOption[];
	showSearch?: boolean;
}

export interface SelectOption {
	label: string;
	value: string;
}

const Select: FC<SelectProps> = ({ value, placeholder, onChange, options }) => {
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
