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
				element: (
					<Suspense fallback={<div>LOAD..</div>}>
						<Outlet />
					</Suspense>
				),
				children: [
					{ index: true, lazy: () => import("shared/qr-code/qr-check") },
				],
			},
			{
				path: "qr-generate",
				element: (
					<Suspense fallback={<div>LOAD..</div>}>
						<Outlet />
					</Suspense>
				),
				children: [
					{ index: true, lazy: () => import("shared/qr-code/qr-generate") },
				],
			},
			{
				path: "home",

				element: (
					<Suspense fallback={<div>LOAD..</div>}>
						<Outlet />
					</Suspense>
				),
				children: [
					{ index: true, lazy: () => import("shared/home/components") },
				],
			},
			{
				path: "my-payments",

				element: (
					<Suspense fallback={<div>LOAD..</div>}>
						<Outlet />
					</Suspense>
				),
				children: [
					{
						index: true,
						lazy: () => import("shared/payment/components/history"),
					},
				],
			},
			{
				path: "partnership",

				element: (
					<Suspense fallback={<div>LOAD..</div>}>
						<Outlet />
					</Suspense>
				),
				children: [{ index: true, lazy: () => import("shared/partnership") }],
			},
			{
				path: "payment/:paymentId",

				element: (
					<Suspense fallback={<div>LOAD..</div>}>
						<Outlet />
					</Suspense>
				),
				children: [
					{
						index: true,
						lazy: () => import("shared/payment/components/payment-info"),
					},
				],
			},
			{
				path: "top-up",

				element: (
					<Suspense fallback={<div>LOAD..</div>}>
						<Outlet />
					</Suspense>
				),
				children: [
					{
						index: true,
						lazy: () => import("shared/payment/components/top-up"),
					},
				],
			},
			{
				path: "/create/business",

				element: (
					<Suspense fallback={<div>LOAD..</div>}>
						<Outlet />
					</Suspense>
				),
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

				element: (
					<Suspense fallback={<div>LOAD..</div>}>
						<Outlet />
					</Suspense>
				),
				children: [
					{
						index: true,
						lazy: () => import("shared/business/components/business-card"),
					},
				],
			},
			{
				path: "/partner/:userId/business/:businessId/update",

				element: (
					<Suspense fallback={<div>LOAD..</div>}>
						<Outlet />
					</Suspense>
				),
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

				element: (
					<Suspense fallback={<div>LOAD..</div>}>
						<Outlet />
					</Suspense>
				),
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
