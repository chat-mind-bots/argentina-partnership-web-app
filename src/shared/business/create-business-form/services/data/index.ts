import { get, patch, post } from "services/api";
import { CreateBusiness } from "shared/business/create-business-form/types/create-business.interface";
import { CategoriesDto } from "shared/business/create-business-form/dto/categories.dto";
import { Business } from "../../dto/business.dto";

export const getBusiness = (id: string) => get<Business>(`business/${id}`, {});

export const createBusiness = (userId: number, body: CreateBusiness) =>
	post<Business>(`business`, { body, query: { userId } });

export const getCategories = () => get<CategoriesDto>("categories", {});

export const updateBusiness = (
	userId: number,
	businessId: string,
	body: CreateBusiness
) =>
	patch<Business>(`business/${businessId}`, {
		body,
		query: { userId },
	});

export const uploadPhoto = (body: FormData) =>
	post<any>(`file/image`, {
		body,
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
