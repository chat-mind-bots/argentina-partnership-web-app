import React from "react";
import InputText from "shared/components/input/input-text";
import {
	ContactsTypeEnum,
	IContacts,
} from "shared/business/create-business-form/types/create-business.interface";
import { Button, Select } from "antd";
import { FormData } from "shared/business/create-business-form/form-contact/index";

interface AddContactProps {
	optionOnChange: (value: ContactsTypeEnum) => void;
	selectOption: string;
	addValue: IContacts;
	contactData: { [key: string]: FormData };
	onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSave: () => void;
}

const AddContact = ({
	optionOnChange,
	selectOption,
	addValue,
	onChangeInput,
	onSave,
	contactData,
}: AddContactProps) => {
	const options = [
		{
			label: "Телеграм",
			value: ContactsTypeEnum.TELEGRAM,
		},
		{
			label: "Телеграм бот",
			value: ContactsTypeEnum.TELEGRAM_BOT,
		},
		{
			label: "Телеграм канал",
			value: ContactsTypeEnum.TELEGRAM_CHANNEL,
		},
		{
			label: "Вебсайт",
			value: ContactsTypeEnum.WEBSITE,
		},
		{
			label: "WhatsApp",
			value: ContactsTypeEnum.WHATSAPP,
		},
		{
			label: "Телефон",
			value: ContactsTypeEnum.PHONE,
		},
	];
	return (
		<div>
			<div>
				<Select
					style={{ width: "100%" }}
					options={options}
					onChange={optionOnChange}
				/>
				{selectOption && (
					<div>
						<InputText
							type={
								addValue.type === ContactsTypeEnum.WHATSAPP ||
								addValue.type === ContactsTypeEnum.PHONE
									? "numeric"
									: "standard"
							}
							addonBefore={contactData[selectOption].icon}
							value={addValue.value}
							placeholder={contactData[selectOption].placeholder}
							onChange={onChangeInput}
						></InputText>
					</div>
				)}
			</div>
			{addValue.value && <Button onClick={onSave}>Сохранить</Button>}
		</div>
	);
};

export default AddContact;
