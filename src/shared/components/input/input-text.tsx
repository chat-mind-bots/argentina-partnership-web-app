import React, { ReactNode } from "react";
import { Input } from "antd";
import styles from "./input-text.module.less";

interface InputTextProps {
	onChange: React.Dispatch<React.SetStateAction<any>>;
	value: string;
	type: "standard" | "numeric";
	placeholder?: string;
	addonBefore?: React.ReactNode;
	addonAfter?: React.ReactNode;
	className?: string;
	status?: "error";
	isTextArea?: boolean;
	description?: ReactNode;
}

const InputText = ({
	value,
	placeholder,
	onChange,
	addonBefore,
	addonAfter,
	className,
	type,
	status,
	isTextArea,
	description,
}: InputTextProps) => {
	if (type === "numeric") {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = e.target.value;
			const reg = /^[0-9+]+$/;
			if (reg.test(inputValue) || inputValue === "") {
				onChange(e);
			}
		};
		return (
			<>
				<Input
					status={status}
					addonBefore={addonBefore}
					addonAfter={addonAfter}
					onChange={handleChange}
					placeholder={placeholder}
					value={value}
					className={`${styles.formInput} ${className ?? ""}`}
				/>
				{description}
			</>
		);
	}
	return (
		<>
			{isTextArea ? (
				<Input.TextArea
					onChange={onChange}
					placeholder={placeholder}
					value={value}
					className={className}
				/>
			) : (
				<Input
					addonBefore={addonBefore}
					addonAfter={addonAfter}
					onChange={onChange}
					placeholder={placeholder}
					value={value}
					className={className}
				/>
			)}
			{description}
		</>
	);
};
export default InputText;
