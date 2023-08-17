import { get, patch, post } from "services/api";
import { CreateBusiness } from "shared/business/create-business-form/types/create-business.interface";
import { CategoriesDto } from "shared/business/create-business-form/dto/categories.dto";

export const getBusiness = (id: string) => get<any>(`business/${id}`, {});

export const createBusiness = (id: string, body: CreateBusiness) =>
	post<any>(`business/${id}/create`, { body });

export const getCategories = () => get<CategoriesDto>("categories", {});

export const updateBusiness = (
	userId: string,
	businessId: string,
	body: CreateBusiness
) =>
	patch<CategoriesDto>(`business/${userId}/business/${businessId}`, {
		body,
	});
