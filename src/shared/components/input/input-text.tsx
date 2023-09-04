import React, { ReactNode, useRef } from "react";
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
	hideKeyboardEnter?: boolean;
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
	hideKeyboardEnter,
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
	const regLink = /^(http|https):\/\//;
	if (value.match(regLink)) {
		value = value.replace(regLink, "");
	}
	const inputRef = useRef<any>(null);
	const handleDocumentTouch = (e: React.TouchEvent<HTMLInputElement>) => {
		if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
			inputRef.current.blur();
		}
	};

	const enterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		event.preventDefault();
		event.currentTarget.blur();
	};

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
					onPressEnter={hideKeyboardEnter ? enterHandler : undefined}
					ref={inputRef}
					onTouchStart={handleDocumentTouch}
					className={className}
				/>
			)}
			{description}
		</>
	);
};
export default InputText;
