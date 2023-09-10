import { get, post } from "services/api";
import { TicketDto } from "shared/partnership/dto/ticket.dto";

export const getTicket = (id: string, role: string) =>
	get<TicketDto>(`rights-change/${id}`, {
		query: {
			role,
		},
	});

export const createTicket = (id: string, role: string) =>
	post("rights-change", {
		body: {
			user: id,
			role,
		},
	});
