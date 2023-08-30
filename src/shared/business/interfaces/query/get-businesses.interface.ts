import { BusinessByEnum } from "shared/business/components/list/enums/sort-by.enum";

export interface GetBusinessesInterface {
	limit: number;
	offset: number;
	q?: string;
	"has-owner"?: boolean;
	category?: string;
	"sort-order"?: "asc" | "desc";
	"sort-by"?: BusinessByEnum;
}
