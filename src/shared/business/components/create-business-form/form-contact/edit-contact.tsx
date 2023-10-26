import React from "react";
import InputText from "shared/components/input/input-text";
import {
	ContactsTypeEnum,
	IContacts,
} from "shared/business/interfaces/create-business.interface";
import { Button, Select } from "antd";
import { FormData } from "shared/business/components/create-business-form/form-contact/index";
import styles from "shared/business/components/create-business-form/business-form.module.less";

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
				<div className={styles.contactsWrapper}>Выберите тип контакта:</div>
				<Select
					style={{ width: "100%" }}
					options={options}
					value={addValue.type}
					defaultValue={addValue.type}
					onChange={optionOnChange}
					className={styles.contactSelector}
				/>
				<div>
					<div className={styles.contactsWrapper}>
						Введите контакт:<span className={styles.requireField}>*</span>
					</div>
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
					/>
				</div>
			</div>
			<div className={styles.formActionButtonsWrapper}>
				{addValue.value && (
					<Button onClick={() => onSave(editIndex)}>Сохранить</Button>
				)}
				<Button onClick={onCancel} type={"link"} danger>
					Отменить
				</Button>
			</div>
		</div>
	);
};

export default EditContact;
