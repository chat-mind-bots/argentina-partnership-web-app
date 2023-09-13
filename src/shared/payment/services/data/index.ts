import { get, patch, post } from "services/api";
import {
	PaymentInterface,
	CreatePaymentInterface,
	PaymentInterfaceDto,
} from "shared/payment/interfaces/payment.interface";
import { GetPaymentDto } from "shared/payment/interfaces/get-payment.dto";

export const createPayment = (userId: string, body: CreatePaymentInterface) =>
	post<PaymentInterface>("payment", { body, query: { userId } });

export const getMyPayments = (query: GetPaymentDto) =>
	get<PaymentInterfaceDto>("payment", { query: { ...query } });

export const getPayment = (userId: string, paymentId: string) =>
	get<PaymentInterface>(`payment/${paymentId}`, { query: { userId } });

export const paymentToId = (
	userId: string,
	paymentId: string,
	txId: string,
	photo?: string
) =>
	patch(`payment/to-review/${paymentId}`, {
		query: { userId },
		body: { data: { txId, photo } },
	});
