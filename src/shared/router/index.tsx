import { createBrowserRouter, Outlet } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import PageLoader from "shared/components/page-loader";
import QrCheck from "shared/qr-code/qr-check";

const TopUp = lazy(() => import("shared/payment/components/top-up"));
const History = lazy(() => import("shared/payment/components/history"));
const PortalLoader = lazy(() => import("shared/components/portal-loader"));

const PaymentAffix = lazy(
	() => import("shared/payment/components/payment-affix")
);

export const router = createBrowserRouter([
	{
		path: "",
		element: (
			<>
				<Suspense>
					<PortalLoader />
					<PaymentAffix />
				</Suspense>
				<Suspense fallback={<PageLoader />}>
					<Outlet />
				</Suspense>
			</>
		),
		children: [
			{
				path: "qr-check",
				element: <QrCheck />,
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

				element: <History />,
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

				element: <TopUp />,
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
