import React from "react";
import InputText from "shared/components/input/input-text";
import {
	ContactsTypeEnum,
	IContacts,
} from "shared/business/interfaces/create-business.interface";
import { Button, Select } from "antd";
import { FormData } from "shared/business/components/create-business-form/form-contact/index";

interface AddContactProps {
	optionOnChange: (value: ContactsTypeEnum) => void;
	addValue: IContacts;
	contactData: { [key: string]: FormData };
	onChangeInput: (text: string) => void;
	onSave: (value: number) => void;
	onCancel: () => void;
	editIndex: number;
}

const EditContact = ({
	optionOnChange,
	addValue,
	onChangeInput,
	onSave,
	contactData,
	onCancel,
	editIndex,
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
					value={addValue.type}
					defaultValue={addValue.type}
					onChange={optionOnChange}
				/>
				<div>
					<InputText
						type={
							addValue.type === ContactsTypeEnum.WHATSAPP ||
							addValue.type === ContactsTypeEnum.PHONE
								? "numeric"
								: "standard"
						}
						addonBefore={contactData[addValue.type].icon}
						value={addValue.value}
						placeholder={contactData[addValue.type].placeholder}
						onChange={onChangeInput}
					></InputText>
				</div>
			</div>
			<Button onClick={onCancel}>Отменить</Button>
			{addValue.value && (
				<Button onClick={() => onSave(editIndex)}>Сохранить</Button>
			)}
		</div>
	);
};

export default EditContact;
