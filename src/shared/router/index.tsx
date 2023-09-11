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
				element: <Suspense fallback={<div>LOAD..</div>}></Suspense>,
			},
			{
				path: "qr-generate",
				lazy: () => import("shared/qr-code/qr-generate"),
				element: <Suspense fallback={<div>LOAD..</div>}></Suspense>,
			},
			{
				path: "home",
				lazy: () => import("shared/home/components"),
				element: <Suspense fallback={<div>LOAD..</div>}></Suspense>,
			},
			{
				path: "my-payments",
				lazy: () => import("shared/payment/components/history"),
				element: <Suspense fallback={<div>LOAD..</div>}></Suspense>,
			},
			{
				path: "partnership",
				lazy: () => import("shared/partnership"),
				element: <Suspense fallback={<div>LOAD..</div>}></Suspense>,
			},
			{
				path: "payment/:paymentId",
				lazy: () => import("shared/payment/components/payment-info"),
				element: <Suspense fallback={<div>LOAD..</div>}></Suspense>,
			},
			{
				path: "top-up",
				lazy: () => import("shared/payment/components/top-up"),
				element: <Suspense fallback={<div>LOAD..</div>}></Suspense>,
			},
			{
				path: "/create/business",
				lazy: () => import("shared/business/components/create-business-form"),
				element: <Suspense fallback={<div>LOAD..</div>}></Suspense>,
			},
			{
				path: "/partner/:userId/business/:businessId/",
				lazy: () => import("shared/business/components/business-card"),
				element: <Suspense fallback={<div>LOAD..</div>}></Suspense>,
			},
			{
				path: "/partner/:userId/business/:businessId/update",
				lazy: () => import("shared/business/components/create-business-form"),
				element: <Suspense fallback={<div>LOAD..</div>}></Suspense>,
			},
			{
				path: "/partners",
				lazy: () => import("shared/business/components/list"),
				element: <Suspense fallback={<div>LOAD..</div>}></Suspense>,
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
