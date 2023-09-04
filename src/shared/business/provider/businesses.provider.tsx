import React, { useReducer } from "react";
import {
	BusinessContext,
	BusinessDispatchContext,
	BusinessesContextProps,
} from "shared/business/context/businesses.context";

export enum BusinessActionKind {
	INCREASE = "INCREASE",
}

export interface BusinessAction {
	type: BusinessActionKind;
	payload: BusinessesContextProps;
}

function businessesReducer(
	state: BusinessesContextProps,
	action: BusinessAction
) {
	switch (action.type) {
		case BusinessActionKind.INCREASE: {
			console.log("11");
			return {
				status: action.payload.status,
				data: {
					total: action.payload.data.total,
					data: [...state.data.data, ...action.payload.data.data],
				},
			};
		}
		default: {
			return state;
		}
	}
}

export function BusinessProvider({ children }: { children: React.ReactNode }) {
	const [businesses, dispatch] = useReducer(businessesReducer, {
		data: {
			data: [],
			total: 0,
		},
		status: "resolved",
	});

	return (
		<BusinessContext.Provider value={businesses}>
			<BusinessDispatchContext.Provider value={dispatch}>
				{children}
			</BusinessDispatchContext.Provider>
		</BusinessContext.Provider>
	);
}
