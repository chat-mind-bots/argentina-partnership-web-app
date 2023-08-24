import { get, post } from "services/api";
import {
	PaymentInterface,
	CreatePaymentInterface,
} from "shared/top-up/interfaces/payment.interface";
import { GetPaymentDto } from "shared/top-up/interfaces/get-payment.dto";

export const createPayment = (userId: string, body: CreatePaymentInterface) =>
	post<PaymentInterface>("payment", { body, query: { userId } });

export const getMyPayments = (userId: string, query: GetPaymentDto) =>
	get<PaymentInterface[]>("payment", { query: { ...query, userId } });
