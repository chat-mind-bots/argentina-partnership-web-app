import { createBrowserRouter, useLoaderData } from "react-router-dom";
import React from "react";
import CreateBusinessForm from "shared/business/create-business-form";
import { JsonplaceholderResp, loadData } from "shared/business/data";
import Partners from "shared/partners";
import Form from "shared/testForm";
import { getCategories } from "shared/business/create-business-form/services/data";
import {
	CategoriesDto,
	Category,
} from "shared/business/create-business-form/dto/categories.dto";

export const router = createBrowserRouter([
	{
		path: "/partners",
		loader: () => loadData(),
		Component() {
			const data = useLoaderData() as JsonplaceholderResp;
			return <Partners />;
		},
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
			return <CreateBusinessForm categories={data} />;
		},
		errorElement: <div>Not found</div>,
	},
	{
		path: "/partner/:userId/business/:businessId",
		loader: () => getCategories(),
		Component() {
			const data = useLoaderData() as Category[];
			return <div>List</div>;
		},
	},
	{
		path: "*",
		Component() {
			return <div>Not found</div>;
		},
	},
]);
