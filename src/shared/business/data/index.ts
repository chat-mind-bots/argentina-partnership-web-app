import { get, patch, post } from "services/api";
import { CreateBusiness } from "shared/business/interfaces/create-business.interface";
import { Category } from "shared/business/dto/categories.dto";
import { Business } from "shared/business/dto/business.dto";
import { PreviewDto } from "shared/business/dto/preview.dto";
import { GetBusinessesInterface } from "shared/business/interfaces/query/get-businesses.interface";
import { BusinessesDto } from "shared/business/dto/businesses.dto";

export const getBusiness = (id: string) => get<Business>(`business/${id}`, {});

export const getBusinesses = (query: GetBusinessesInterface) =>
	get<BusinessesDto>(`business`, { query: { ...query } });

export const createBusiness = (userId: number, body: CreateBusiness) =>
	post<Business>(`business`, { body, query: { userId } });

export const getCategories = () => get<Category[]>("categories", {});

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

export const getImage = (imageId: string) =>
	get<PreviewDto>("file/image", {
		query: {
			imageId,
		},
	});
