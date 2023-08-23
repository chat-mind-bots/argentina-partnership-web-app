import { IAddress } from "shared/business/create-business-form/types/address.interface";
import { Category } from "shared/business/create-business-form/dto/categories.dto";

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
	title: string;
	categoryId: string;
	description: string;
	contacts: Array<IContacts>;
	address: IAddress;
	preview?: string;
}
