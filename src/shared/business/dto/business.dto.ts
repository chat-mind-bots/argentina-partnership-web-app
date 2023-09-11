import { IAddress } from "shared/business/interfaces/address.interface";
import { Category } from "shared/business/dto/categories.dto";
import { IContacts } from "shared/business/interfaces/create-business.interface";
import { PreviewDto } from "shared/business/dto/preview.dto";
import { UserDto } from "shared/business/dto/user.dto";

export enum StatusEnum {
	"DISABLED" = "disabled",
	"ACTIVE" = "active",
}

export interface Business {
	_id: string;
	owner: UserDto;
	title: string;
	category: Category;
	description: string;
	contacts: Array<IContacts>;
	address: IAddress;
	status: StatusEnum;
	preview: PreviewDto;
	avgCheck: number;
}
