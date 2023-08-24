import { createBrowserRouter } from "react-router-dom";
import React from "react";

export const router = createBrowserRouter([
	{
		path: "qr-check",
		lazy: () => import("shared/qr-code/qr-check"),
	},
	{
		path: "qr-generate",
		lazy: () => import("shared/qr-code/qr-generate"),
	},
	{
		path: "home",
		lazy: () => import("shared/home/components"),
	},
	{
		path: "top-up",
		lazy: () => import("shared/top-up/components"),
	},
	{
		path: "/create/business",
		lazy: () => import("shared/business/create-business-form"),
	},

	{
		path: "/partner/:userId/business/:businessId/update",
		lazy: () => import("shared/business/create-business-form"),
	},
	{
		path: "*",
		Component() {
			return <div>Not found</div>;
		},
	},
]);
