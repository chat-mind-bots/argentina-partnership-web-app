export const config = {
	api: {
		baseURL: process.env.BACKEND_ENDPOINT,
		// process.env.NODE_ENV === "develop" ? "http://localhost:5050/" : undefined,
		timeout: 25000,
	},
};
