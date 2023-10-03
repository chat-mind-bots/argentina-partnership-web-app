export interface User {
	_id: string;
	balance: { _id: string; amount: number };
	username: string;
	refCode: string;
	role: [string];
}
