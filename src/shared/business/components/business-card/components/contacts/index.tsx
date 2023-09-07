import React from "react";
import styles from "shared/business/components/business-card/components/contacts/contacts.module.less";
import { ReactComponent as Telegram } from "public/assets/icons/telegram.svg";
import { ReactComponent as Website } from "public/assets/icons/website.svg";
import { ReactComponent as Phone } from "public/assets/icons/phone.svg";
import { ReactComponent as WhatsApp } from "public/assets/icons/whatsapp.svg";
import { ReactComponent as Bot } from "public/assets/icons/bot.svg";
import {
	ContactsTypeEnum,
	IContacts,
} from "shared/business/interfaces/create-business.interface";

interface ContactsProps {
	contacts: IContacts[];
}

function getByValue(value: ContactsTypeEnum) {
	const options = [
		{
			label: (
				<div className={styles.label}>
					<div>Telegram</div>
					<div className={styles.icon}>
						<Telegram />
					</div>
				</div>
			),
			value: ContactsTypeEnum.TELEGRAM,
			link: `https://t.me/`,
		},
		{
			label: (
				<div className={styles.label}>
					<div>Telegram бот</div>
					<div className={styles.icon}>
						<Telegram />
					</div>
					<div className={`${styles.icon} ${styles.customIcon}`}>
						<Bot />
					</div>
				</div>
			),
			value: ContactsTypeEnum.TELEGRAM_BOT,
			link: `https://t.me/`,
		},
		{
			label: (
				<div className={styles.label}>
					<div>Telegram канал</div>
					<div className={styles.icon}>
						<Telegram />
					</div>
				</div>
			),
			value: ContactsTypeEnum.TELEGRAM_CHANNEL,
			link: `https://t.me/`,
		},
		{
			label: (
				<div className={styles.label}>
					<div>Вебсайт</div>
					<div className={styles.icon}>
						<div className={styles.customIcon}>
							<Website />
						</div>
					</div>
				</div>
			),
			value: ContactsTypeEnum.WEBSITE,
			link: `https://`,
		},
		{
			label: (
				<div className={styles.label}>
					<div>WhatsApp</div>
					<div className={styles.icon}>
						<WhatsApp />
					</div>
				</div>
			),
			value: ContactsTypeEnum.WHATSAPP,
			link: `https://api.whatsapp.com/send?phone=`,
		},
		{
			label: (
				<div className={styles.label}>
					<div>Телефон</div>
					<div className={styles.icon}>
						<div className={styles.customIcon}>
							<Phone />
						</div>
					</div>
				</div>
			),
			value: ContactsTypeEnum.PHONE,
			link: `tel:`,
		},
	];

	return options.find((option) => option.value === value);
}

const Contacts = ({ contacts }: ContactsProps) => {
	return (
		<div>
			<div className={styles.contactsWrapper}>
				{contacts.map((value) => {
					const option = getByValue(value.type);
					return (
						<div className={styles.contact}>
							<div className={styles.label}>{option?.label}</div>
							<a href={option?.link + value.value} target={"_blank"}>
								{value.value}
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Contacts;
