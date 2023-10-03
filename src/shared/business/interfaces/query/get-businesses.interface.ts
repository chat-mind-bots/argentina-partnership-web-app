import { BusinessByEnum } from "shared/business/components/list/enums/sort-by.enum";
import { StatusEnum } from "shared/business/dto/business.dto";

export interface GetBusinessesInterface {
	limit: number;
	page: number;
	q?: string;
	"has-owner"?: boolean;
	category?: string;
	status?: StatusEnum;
	"sort-order"?: "asc" | "desc";
	"sort-by"?: BusinessByEnum;
}
