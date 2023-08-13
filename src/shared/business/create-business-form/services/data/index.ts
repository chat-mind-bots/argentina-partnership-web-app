import { get, post } from "services/api";
import { CreateBusiness } from "shared/business/create-business-form/types/create-business.interface";
import { CategoriesDto } from "shared/business/create-business-form/types/categories.dto";

export const getBusiness = (id: number) => get<any>(`chats/${id}`, {});

export const createBusiness = (id: number, body: CreateBusiness) =>
	post<any>(`${id}/business/create`, { body });

export const getCategories = () => get<CategoriesDto>("categories", {});
