import { BusinessByEnum } from "shared/business/components/list/enums/sort-by.enum";

export interface GetBusinessesInterface {
	limit: number;
	page: number;
	q?: string;
	"has-owner"?: boolean;
	category?: string;
	"sort-order"?: "asc" | "desc";
	"sort-by"?: BusinessByEnum;
}
