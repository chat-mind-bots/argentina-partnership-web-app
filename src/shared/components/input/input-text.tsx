import React, { ReactNode } from "react";
import { Input } from "antd";
import styles from "./input-text.module.less";

interface InputTextProps {
	onChange: (text: string) => void;
	value: string;
	type: "standard" | "numeric";
	placeholder?: string;
	addonBefore?: React.ReactNode;
	addonAfter?: React.ReactNode;
	className?: string;
	status?: "error";
	isTextArea?: boolean;
	description?: ReactNode;
	onFocus?: () => void;
	onBlur?: () => void;
	onEnter?: () => void;
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
	onFocus,
	onEnter,
	onBlur,
	description,
}: InputTextProps) => {
	if (type === "numeric") {
		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = event.target.value;
			const reg = /^[0-9+]+$/;
			if (reg.test(inputValue) || inputValue === "") {
				onChange(inputValue);
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
	const regLink = /^(http|https):\/\//;
	if (value.match(regLink)) {
		value = value.replace(regLink, "");
	}

	return (
		<>
			{isTextArea ? (
				<Input.TextArea
					onChange={(event) => onChange(event.target.value)}
					placeholder={placeholder}
					value={value}
					className={className}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			) : (
				<Input
					addonBefore={addonBefore}
					addonAfter={addonAfter}
					onChange={(event) => onChange(event.target.value)}
					placeholder={placeholder}
					value={value}
					onPressEnter={onEnter}
					className={className}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			)}
			{description}
		</>
	);
};
export default InputText;
