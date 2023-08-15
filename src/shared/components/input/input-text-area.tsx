import React, { useEffect } from "react";
import { Input } from "antd";

interface InputTextProps {
	onChange: React.Dispatch<React.SetStateAction<any>>;
	value: string;
	fieldName: string;
	placeholder?: string;
	className?: string;
	isEmptyCallback: (value: boolean) => void;
}

const InputTextArea = ({
	value,
	placeholder,
	onChange,
	className,
	fieldName,
	isEmptyCallback,
}: InputTextProps) => {
	const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange((prevData: any) => ({
			...prevData,
			[fieldName]: event.target.value,
		}));
	};
	useEffect(() => {
		if (value !== "") {
			isEmptyCallback(false);
		} else {
			isEmptyCallback(true);
		}
	}, [value]);

	return (
		<Input.TextArea
			onChange={handleOnChange}
			placeholder={placeholder}
			value={value}
			className={className}
		/>
	);
};

export default InputTextArea;
