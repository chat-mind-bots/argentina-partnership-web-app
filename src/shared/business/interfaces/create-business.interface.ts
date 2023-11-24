import { IAddress } from "shared/business/interfaces/address.interface";
import { StatusEnum } from "shared/business/dto/business.dto";

export enum ContactsTypeEnum {
	TELEGRAM = "tg_username",
	TELEGRAM_BOT = "tg_bot",
	TELEGRAM_CHANNEL = "tg_channel",
	WEBSITE = "website",
	PHONE = "phone",
	WHATSAPP = "whatsapp",
	INSTAGRAM = "instagram",
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
	status: StatusEnum;
	avgCheck?: number;
	preview?: string;
}
