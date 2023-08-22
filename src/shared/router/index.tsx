import { createBrowserRouter } from "react-router-dom";
import React from "react";

export const router = createBrowserRouter([
	{
		path: "qr-check",
		lazy: () => import("../qr-check"),
	},
	{
		path: "home",
		lazy: () => import("shared/home/components"),
	},
	{
		path: "/create/business",
		lazy: () => import("../business/create-business-form"),
	},
	// {
	// 	path: "/partner/:userId/business/:businessId",
	// 	loader: async ({ params }) => {
	// 		const categories = await getCategories();
	// 		const data = await getBusiness(`${params.businessId}`);
	// 		return { categories, data };
	// 	},
	// 	Component() {
	// 		const data = useLoaderData() as Category[];
	// 		return <div>List</div>;
	// 	},
	// },
	{
		path: "/partner/:userId/business/:businessId/update",
		lazy: () => import("../business/create-business-form"),
	},
	{
		path: "*",
		Component() {
			return <div>Not found</div>;
		},
	},
]);
