import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { CreateBusiness } from "shared/business/create-business-form/types/create-business.interface";

interface InputTextProps {
	onChange: React.Dispatch<React.SetStateAction<any>>;
	value: string;
	fieldName: string;
	placeholder?: string;
}

const InputText = ({
	value,
	placeholder,
	onChange,
	fieldName,
}: InputTextProps) => {
	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange((prevData: any) => ({
			...prevData,
			[fieldName]: event.target.value,
		}));
	};

	return (
		<Input onChange={handleOnChange} placeholder={placeholder} value={value} />
	);
};

export default InputText;
