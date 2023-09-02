import React from "react";
import { BusinessAction } from "shared/business/provider/businesses.provider";
import { BusinessesDto } from "shared/business/dto/businesses.dto";

export interface BusinessesContextProps {
	data: BusinessesDto;
	status: "rejected" | "resolved" | "pending";
}

export const BusinessContext =
	React.createContext<BusinessesContextProps | null>(null);

export const BusinessDispatchContext =
	React.createContext<React.Dispatch<BusinessAction> | null>(null);
