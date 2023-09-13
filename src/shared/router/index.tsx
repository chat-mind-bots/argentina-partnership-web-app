import { createBrowserRouter, Outlet } from "react-router-dom";
import React, { Suspense,  lazy } from "react";
import PortalLoader from "shared/components/portal-loader";

const PaymentAffix = lazy(
	() => import("shared/payment/components/payment-affix")
);
export const router = createBrowserRouter([
	{
		path: "",
		element: (
			<Suspense>
				<PaymentAffix />
				<Outlet />
			</Suspense>
		),
		children: [
			{
				path: "qr-check",
				element: (
					<Suspense>
						<PortalLoader />
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
					<Suspense>
						<PortalLoader />
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
					<Suspense>
						<PortalLoader />
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
					<Suspense>
						<PortalLoader />
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
					<Suspense>
						<PortalLoader />
						<Outlet />
					</Suspense>
				),
				children: [{ index: true, lazy: () => import("shared/partnership") }],
			},
			{
				path: "payment/:paymentId",

				element: (
					<Suspense>
						<PortalLoader />
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
					<Suspense>
						<PortalLoader />
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
					<Suspense>
						<PortalLoader />
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
					<Suspense>
						<PortalLoader />
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
					<Suspense>
						<PortalLoader />
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
					<Suspense>
						<PortalLoader />
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
