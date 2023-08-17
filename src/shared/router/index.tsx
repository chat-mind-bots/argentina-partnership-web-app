import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Form from "shared/testForm";

export const router = createBrowserRouter([
	{
		path: "partners",
		lazy: () => import("../partners"),
	},
	// {
	// 	path: "/test",
	// 	Component() {
	// 		return <Form />;
	// 	},
	// },
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
	// {
	// 	path: "/partner/:userId/business/:businessId/update",
	// 	loader: async ({ params }) => {
	// 		const categories = await getCategories();
	// 		const data = await getBusiness(`${params.businessId}`);
	// 		const id = `${params.businessId}`;
	// 		return { categories, data, id };
	// 	},
	// 	Component() {
	// 		const data = useLoaderData();
	// 		return (
	// 			<></>
	// 			// <BusinessForm
	// 			// 	// @ts-ignore
	// 			// 	categories={data["categories"]}
	// 			// 	// @ts-ignore
	// 			// 	initialState={data["data"]}
	// 			// 	// @ts-ignore
	// 			// 	businessId={data["id"]}
	// 			// />
	// 		);
	// 	},
	// },
	{
		path: "*",
		Component() {
			return <div>Not found</div>;
		},
	},
]);
