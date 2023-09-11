import { createBrowserRouter, Outlet } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import PageLoader from "../components/page-loader";
import { topUpLoader } from "../payment/components/top-up";
import { homeLoader } from "../home/components";
import { qrGenerateLoader } from "../qr-code/qr-generate";
import { historyLoader } from "../payment/components/history";
import { partnerShipLoader } from "../partnership";
import { paymentInfoLoader } from "../payment/components/payment-info";
import { createBusinessLoader } from "../business/components/create-business-form";
import { businessCardLoader } from "../business/components/business-card";
import { partnersLoader } from "../business/components/list";

const TopUp = lazy(() => import("shared/payment/components/top-up"));
const Home = lazy(() => import("shared/home/components"));
const QrCheck = lazy(() => import("shared/qr-code/qr-check"));
const QrGenerate = lazy(() => import("shared/qr-code/qr-generate"));
const History = lazy(() => import("shared/payment/components/history"));
const Paertnersip = lazy(() => import("shared/partnership"));
const Info = lazy(() => import("shared/payment/components/payment-info"));
const PartnersList = lazy(() => import("shared/business/components/list"));
const BusinessCard = lazy(
	() => import("shared/business/components/business-card")
);
const CreateBusiness = lazy(
	() => import("shared/business/components/create-business-form")
);

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
					<Suspense fallback={<div>QR LOAD </div>}>
						<QrCheck />
					</Suspense>
				),
				// lazy: () => import("shared/qr-code/qr-check"),
			},
			{
				path: "qr-generate",
				loader: qrGenerateLoader,
				element: (
					<Suspense fallback={<div>QR GENERATE LOAD</div>}>
						<QrGenerate />
					</Suspense>
				),
				// lazy: () => import("shared/qr-code/qr-generate"),
			},
			{
				path: "home",
				loader: homeLoader,
				element: (
					<Suspense fallback={<div>HOME LOAD</div>}>
						<Home />
					</Suspense>
				),
				// lazy: () => import("shared/home/components"),
			},
			{
				path: "my-payments",
				loader: historyLoader,
				element: (
					<Suspense fallback={<div>HISTORY LOADER</div>}>
						<History />
					</Suspense>
				),
				// lazy: () => import("shared/payment/components/history"),
			},
			{
				path: "partnership",
				loader: partnerShipLoader,
				element: (
					<Suspense fallback={<div>PARTNERSIP LOADER</div>}>
						<Paertnersip />
					</Suspense>
				),
				// lazy: () => import("shared/partnership"),
			},
			{
				path: "payment/:paymentId",
				loader: paymentInfoLoader,
				element: (
					<Suspense fallback={<div>PAYMENT LOAD</div>}>
						<Info />
					</Suspense>
				),
				// lazy: () => import("shared/payment/components/payment-info"),
			},
			{
				path: "top-up",
				loader: topUpLoader,
				element: (
					<Suspense fallback={<div>TOP UP LOAD</div>}>
						<TopUp />
					</Suspense>
				),
				// lazy: () => import("shared/payment/components/top-up"),
			},
			{
				path: "/create/business",
				loader: createBusinessLoader,
				element: (
					<Suspense fallback={<div>CREATE BUSINESS FALLBACK</div>}>
						<CreateBusiness />
					</Suspense>
				),
				// lazy: () => import("shared/business/components/create-business-form"),
			},
			{
				path: "/partner/:userId/business/:businessId/",
				loader: businessCardLoader,
				element: (
					<Suspense fallback={<div>BUSINESS CARD LOADER</div>}>
						<BusinessCard />
					</Suspense>
				),
				// lazy: () => import("shared/business/components/business-card"),
			},
			{
				path: "/partner/:userId/business/:businessId/update",
				loader: createBusinessLoader,
				element: (
					<Suspense fallback={<div>UPDATE BUSINESS FALLBACK</div>}>
						<CreateBusiness />
					</Suspense>
				),
				// lazy: () => import("shared/business/components/create-business-form"),
			},
			{
				path: "/partners",
				loader: partnersLoader,
				element: (
					<Suspense fallback={<div>PARTMNENRS LIST FALLBACK</div>}>
						<PartnersList />
					</Suspense>
				),
				// lazy: () => import("shared/business/components/list"),
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
