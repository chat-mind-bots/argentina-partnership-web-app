import { createBrowserRouter, Outlet } from "react-router-dom";
import React, { Suspense } from "react";
import PageLoader from "../components/page-loader";

export const router = createBrowserRouter([
	{
		path: "",
		element: (
			<Suspense fallback={<PageLoader />}>
				<Outlet />
			</Suspense>
		),
		children: [
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
				path: "my-payments",
				lazy: () => import("shared/payment/components/history"),
			},
			{
				path: "partnership",
				lazy: () => import("shared/partnership"),
			},
			{
				path: "payment/:paymentId",
				lazy: () => import("shared/payment/components/payment-info"),
			},
			{
				path: "top-up",
				lazy: () => import("shared/payment/components/top-up"),
			},
			{
				path: "/create/business",
				lazy: () => import("shared/business/components/create-business-form"),
			},
			{
				path: "/partner/:userId/business/:businessId/",
				lazy: () => import("shared/business/components/business-card"),
			},
			{
				path: "/partner/:userId/business/:businessId/update",
				lazy: () => import("shared/business/components/create-business-form"),
			},
			{
				path: "/partners",
				lazy: () => import("shared/business/components/list"),
			},
		],
	},
	{
		path: "*",
		Component() {
			return <div>Not found</div>;
		},
	},
]);
