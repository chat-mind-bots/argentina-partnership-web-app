import * as process from "process";

export const config = {
	api: {
		baseURL: process.env.MODE
			? process.env.MODE === "LOCAL"
				? "http://localhost:3000/"
				: `https://${process.env.BASE_URL}/api/`
			: "http://localhost:3000/",
		// process.env.NODE_ENV === "develop" ? "http://localhost:5050/" : undefined,
		timeout: 25000,
	},
};
