import React from "react";
import { Input } from "antd";

interface InputTextProps {
	onChange: React.Dispatch<React.SetStateAction<any>>;
	value: string;
	placeholder?: string;
	addonBefore?: React.ReactNode;
	addonAfter?: React.ReactNode;
	className?: string;
	type: "standard" | "numeric";
}

const InputText = ({
	value,
	placeholder,
	onChange,
	addonBefore,
	addonAfter,
	className,
	type,
}: InputTextProps) => {
	if (type === "numeric") {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = e.target.value;
			const reg = /^[0-9+]+$/;
			if (reg.test(inputValue)) {
				onChange(e);
			}
		};
		return (
			<Input
				addonBefore={addonBefore}
				addonAfter={addonAfter}
				onChange={handleChange}
				placeholder={placeholder}
				value={value}
				className={className}
			/>
		);
	}
	return (
		<Input
			addonBefore={addonBefore}
			addonAfter={addonAfter}
			onChange={onChange}
			placeholder={placeholder}
			value={value}
			className={className}
		/>
	);
};
export default InputText;
