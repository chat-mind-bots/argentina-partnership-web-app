export interface ITariff {
	_id: string;
	title: string;
	price: number;
	period: number;
	salePercent?: number;
	description?: string;
}
