export const config = {
	api: {
		baseURL:
			import.meta.env.VITE_MODE === "LOCAL"
				? "http://localhost:3000"
				: `https://${import.meta.env.VITE_BASE_URL}/api/`,
		timeout: 25000,
	},
};
