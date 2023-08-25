import { get, post } from "services/api";
import {
	PaymentInterface,
	CreatePaymentInterface,
} from "shared/payment/interfaces/payment.interface";
import { GetPaymentDto } from "shared/payment/interfaces/get-payment.dto";

export const createPayment = (userId: string, body: CreatePaymentInterface) =>
	post<PaymentInterface>("payment", { body, query: { userId } });

export const getMyPayments = (userId: string, query: GetPaymentDto) =>
	get<PaymentInterface[]>("payment", { query: { ...query, userId } });
