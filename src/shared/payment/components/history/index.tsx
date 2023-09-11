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
export async function loader() {
	// @ts-ignore
	const user = window.Telegram.WebApp.initDataUnsafe?.user;

	const userData = await get<User>(`user/${user.id}`, {});
	return defer({ user: userData });
}
export interface IFiltersForm {
	status?: PaymentStatusEnum;
	currency?: CurrenciesEnum;
}

export function Component() {
	return (
		<Suspense fallback={<div>AAAA HISTORY LOADs</div>}>
			<History />
		</Suspense>
	);
}
// export function Component() {
// 	const data = useLoaderData() as { user: User };
// 	return (
// 		<Suspense fallback={<PageLoader />}>
// 			<Await resolve={data.user}>
// 				<History />
// 			</Await>
// 		</Suspense>
// 	);
// }
