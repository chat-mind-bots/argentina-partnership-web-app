export interface BusinessDto {
	data: Business[];
}
export interface Business {
	_id: string;
	title: string;
	description?: string;
}
