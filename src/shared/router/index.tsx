import { createBrowserRouter, Outlet } from "react-router-dom";
import React from "react";
export const router = createBrowserRouter([
	{
		path: "",
		element: <Outlet />,
		children: [
			{
				path: "qr-check",
				element: <Outlet />,
				children: [
					{ index: true, lazy: () => import("shared/qr-code/qr-check") },
				],
			},
			{
				path: "qr-generate",
				element: <Outlet />,
				children: [
					{ index: true, lazy: () => import("shared/qr-code/qr-generate") },
				],
			},
			{
				path: "home",

				element: <Outlet />,
				children: [
					{ index: true, lazy: () => import("shared/home/components") },
				],
			},
			{
				path: "my-payments",

				element: <Outlet />,
				children: [
					{
						index: true,
						lazy: () => import("shared/payment/components/history"),
					},
				],
			},
			{
				path: "partnership",

				element: <Outlet />,
				children: [{ index: true, lazy: () => import("shared/partnership") }],
			},
			{
				path: "payment/:paymentId",

				element: <Outlet />,
				children: [
					{
						index: true,
						lazy: () => import("shared/payment/components/payment-info"),
					},
				],
			},
			{
				path: "top-up",

				element: <Outlet />,
				children: [
					{
						index: true,
						lazy: () => import("shared/payment/components/top-up"),
					},
				],
			},
			{
				path: "/create/business",

				element: <Outlet />,
				children: [
					{
						index: true,
						lazy: () =>
							import("shared/business/components/create-business-form"),
					},
				],
			},
			{
				path: "/partner/:userId/business/:businessId/",

				element: <Outlet />,
				children: [
					{
						index: true,
						lazy: () => import("shared/business/components/business-card"),
					},
				],
			},
			{
				path: "/partner/:userId/business/:businessId/update",

				element: <Outlet />,
				children: [
					{
						index: true,
						lazy: () =>
							import("shared/business/components/create-business-form"),
					},
				],
			},
			{
				path: "/partners",

				element: <Outlet />,
				children: [
					{
						index: true,
						lazy: () => import("shared/business/components/list"),
					},
				],
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
