import { IAddress } from "shared/business/interfaces/address.interface";
import { Category } from "shared/business/dto/categories.dto";
import { IContacts } from "shared/business/interfaces/create-business.interface";
import { PreviewDto } from "shared/business/dto/preview.dto";

export interface Business {
	_id: string;
	title: string;
	category: Category;
	description: string;
	contacts: Array<IContacts>;
	address: IAddress;
	preview: PreviewDto;
	avgCheck: number;
}
