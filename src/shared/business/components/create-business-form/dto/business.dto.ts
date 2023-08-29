import { IAddress } from "shared/business/components/create-business-form/types/address.interface";
import { Category } from "shared/business/components/create-business-form/dto/categories.dto";
import { IContacts } from "shared/business/components/create-business-form/types/create-business.interface";
import { PreviewDto } from "shared/business/components/create-business-form/dto/preview.dto";

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
