import React, { Suspense, lazy } from "react";
import styles from "shared/payment/components/history/history.module.less";
import {
	Await,
	defer,
	useAsyncValue,
	useLoaderData,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import PageLoader from "shared/components/page-loader";
import { get } from "services/api";
import { User } from "shared/home/interfaces/user.interface";
import { PaymentStatusEnum } from "shared/payment/interfaces/payment-statuses.enum";
import { CurrenciesEnum } from "shared/payment/interfaces/currencies.enum";

const History = lazy(() => import("shared/payment/components/history/content"));

export interface IFiltersForm {
	status?: PaymentStatusEnum;
	currency?: CurrenciesEnum;
}

export function Component() {
	return (
		<Suspense fallback={<PageLoader />}>
			<History />
		</Suspense>
	);
}
