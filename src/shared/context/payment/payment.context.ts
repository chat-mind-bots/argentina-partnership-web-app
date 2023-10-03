import { createContext } from "react";

export interface IPaymentContext {
	payments: number;
	updatePayments?: () => void;
}
export const PaymentContext = createContext<IPaymentContext>({ payments: 0 });
