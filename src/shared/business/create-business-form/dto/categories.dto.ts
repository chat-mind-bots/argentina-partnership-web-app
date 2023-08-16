export interface CategoriesDto {
	data: Category[];
}
export interface Category {
	_id: string;
	title: string;
	description?: string;
}
