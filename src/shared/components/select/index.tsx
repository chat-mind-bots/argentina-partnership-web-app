import React, { FC, ReactNode } from "react";
import styles from "shared/components/select/select.module.less";
import { Select as AntdSelect } from "antd";

export interface SelectProps {
	value?: string;
	placeholder: string;
	onChange: (str: string) => void;
	options: SelectOption[];
	showSearch?: boolean;
	description?: ReactNode;
	allowClear?: boolean;
}

export interface SelectOption {
	label: string;
	value: string;
}

const Select: FC<SelectProps> = ({
	value,
	placeholder,
	onChange,
	allowClear,
	options,
	showSearch,
	description,
}) => {
	return (
		<div className={styles.wrapper}>
			<AntdSelect
				showSearch={showSearch}
				allowClear={allowClear}
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
			{description}
		</div>
	);
};

export default Select;
