import React from "react";
import {
	ContactsTypeEnum,
	IContacts,
} from "shared/business/create-business-form/types/create-business.interface";
import styles from "./contacts.module.css";

interface ContactsProps {
	contacts: IContacts[];
}

function getLabelByValue(value: ContactsTypeEnum) {
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

	const option = options.find((option) => option.value === value);
	return option ? option.label : "Unknown";
}

const Contacts = ({ contacts }: ContactsProps) => {
	return (
		<div>
			<div className={styles.contactsWrapper}>
				{contacts.map((value) => {
					return (
						<div className={styles.contact}>
							<div className={styles.label}>{getLabelByValue(value.type)}:</div>
							<div>{value.value}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Contacts;
