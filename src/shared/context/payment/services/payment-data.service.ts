import { GetPaymentDto } from "shared/payment/interfaces/get-payment.dto";
import { get } from "services/api";

export const getMyPaymentsCount = (query: Pick<GetPaymentDto, "status">) =>
	get<number>("payment/total", { query: { ...query } });
