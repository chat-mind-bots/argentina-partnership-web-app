import { createBrowserRouter, Outlet } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import PageLoader from "shared/components/page-loader";
import { ReactComponent as ErrorIcon } from "public/assets/icons/notOk.svg";
import ErrorElement from "shared/components/error-element";

const QrCheck = lazy(() => import("shared/qr-code/qr-check"));

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
				index: true,
				lazy: () => import("shared/main"),
			},
			{
				path: "qr-check",
				element: <QrCheck />,
			},
			{
				path: "qr-generate",
				element: <Outlet />,
				children: [
					{
						index: true,
						lazy: () => import("shared/qr-code/qr-generate"),
						errorElement: (
							<Suspense>
								<ErrorElement
									icon={<ErrorIcon />}
									buttonTitle={"Купить подписку"}
									title={"У вас нет подписки"}
									secondaryTitle={"но вы всегда можете ее приобрести"}
									href={"/tariffs"}
								/>
							</Suspense>
						),
					},
				],
			},
			{
				path: "home",

				element: <Outlet />,
				children: [
					{
						index: true,
						lazy: () => import("shared/home/components"),
						errorElement: (
							<Suspense>
								<ErrorElement
									icon={<ErrorIcon />}
									isExternalLink
									buttonTitle={"Запустить бота"}
									title={"Авторизуйтесь через бота"}
									// secondaryTitle={""}
								/>
							</Suspense>
						),
					},
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
				path: "business/create",

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
				path: "business/:businessId",

				element: <Outlet />,
				children: [
					{
						index: true,
						lazy: () => import("shared/business/components/business-card"),
					},
				],
			},
			{
				path: "business/:businessId/update",

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
				path: "business",

				element: <Outlet />,
				children: [
					{
						index: true,
						lazy: () => import("shared/business/components/list"),
					},
				],
			},
			{
				path: "tariffs",
				element: <Outlet />,
				children: [
					{
						index: true,
						lazy: () => import("shared/subscription"),
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
