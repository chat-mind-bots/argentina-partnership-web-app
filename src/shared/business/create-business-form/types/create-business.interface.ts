export enum ContactsTypeEnum {
	TELEGRAM = "tg_username",
	TELEGRAM_BOT = "tg_bot",
	TELEGRAM_CHANNEL = "tg_channel",
	WEBSITE = "website",
	PHONE = "phone",
	WHATSAPP = "whatsapp",
}

export interface IContacts {
	type: ContactsTypeEnum;
	value: string;
}

export interface CreateBusiness {
	categoryName: string;
	title: string;
	description?: string;
	contacts?: Array<IContacts>;
	address?: string;
	preview?: string;
}
