import { IAddress } from "shared/business/create-business-form/types/address.interface";

export interface BusinessDto {
	data: Business[];
}
export interface Business {
	_id: string;
	title: string;
	description?: string;
	address: IAddress;
	categoryId: string;
}
