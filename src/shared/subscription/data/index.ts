import { get } from "services/api";

export const getTariffs = () => get("/tariff", {});
