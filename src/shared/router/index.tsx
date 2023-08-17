import { createBrowserRouter, useLoaderData } from "react-router-dom";
import React from "react";
import BusinessForm from "shared/business/create-business-form";
import { JsonplaceholderResp, loadData } from "shared/business/data";
// import Partners from "shared/partners";
import Form from "shared/testForm";
import {
	getBusiness,
	getCategories,
} from "shared/business/create-business-form/services/data";
import {
	CategoriesDto,
	Category,
} from "shared/business/create-business-form/dto/categories.dto";
import PageLoader from "shared/components/page-loader";

export const router = createBrowserRouter([
	{
		path: "partners",
		lazy: () => import("../partners"),
		// async lazy() {
		// 	const { Partners } = await import("../partners");
		// 	return { loader: loadData, Component: Partners };
		// },
	},
	{
		path: "/test",
		Component() {
			return <Form />;
		},
	},
	{
		path: "/create/business",
		loader: () => getCategories(),
		Component() {
			const data = useLoaderData() as Category[];
			return <BusinessForm categories={data} />;
		},
		errorElement: <div>Not found</div>,
	},
	{
		path: "/partner/:userId/business/:businessId",
		loader: async ({ params }) => {
			const categories = await getCategories();
			const data = await getBusiness(`${params.businessId}`);
			return { categories, data };
		},
		Component() {
			const data = useLoaderData() as Category[];
			return <div>List</div>;
		},
	},
	{
		path: "/partner/:userId/business/:businessId/update",
		loader: async ({ params }) => {
			const categories = await getCategories();
			const data = await getBusiness(`${params.businessId}`);
			const id = `${params.businessId}`;
			return { categories, data, id };
		},
		Component() {
			const data = useLoaderData();
			return (
				<BusinessForm
					// @ts-ignore
					categories={data["categories"]}
					// @ts-ignore
					initialState={data["data"]}
					// @ts-ignore
					businessId={data["id"]}
				/>
			);
		},
	},
	{
		path: "*",
		Component() {
			return <div>Not found</div>;
		},
	},
]);
