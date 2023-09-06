import React, { Suspense, useCallback, useEffect, useState } from "react";
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
import TopUpHistory from "public/assets/icons/top-up-history.svg";
import Filter from "public/assets/icons/filter.svg";
import { PaymentInterface } from "shared/payment/interfaces/payment.interface";
import {
	BackButton,
	MainButton,
	WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import { User } from "shared/home/interfaces/user.interface";
import Header from "shared/components/header";
import PaymentCard from "shared/payment/components/history/card";
import Card from "shared/components/card";
import Modal from "shared/components/modal";
import { PaymentStatusEnum } from "shared/payment/interfaces/payment-statuses.enum";
import { CurrenciesEnum } from "shared/payment/interfaces/currencies.enum";
import FilterForm from "shared/payment/components/history/filter-form";
import NothingFound from "shared/components/nothing-found";
import { getMyPayments } from "shared/payment/services/data";

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
interface IFilters extends IFiltersForm {
	page: number;
}
const History = () => {
	const user = useAsyncValue() as User;
	const [searchParams] = useSearchParams();

	const [payments, setPayments] = useState<PaymentInterface[]>([]);
	const [filters, setFilters] = useState<IFilters>({
		page: 0,
		status: searchParams.get("status")
			? (searchParams.get("status") as PaymentStatusEnum)
			: undefined,
	});
	const [temporaryFilters, setTemporaryFilters] = useState<IFiltersForm>({});

	const [isOpenFilters, setIsOpenFilters] = useState(false);

	const [loading, setLoading] = useState(false);
	const [emptyResult, setEmptyResult] = useState(false);

	const navigation = useNavigate();

	const reLoad = () => {
		setFilters({ page: 0 });
	};
	useEffect(() => {
		setLoading(true);
		setEmptyResult(false);
		getMyPayments(user._id, {
			limit: 10,
			offset: filters.page * 10,
			status: filters.status ? filters.status : undefined,
			currency: filters.currency ? filters.currency : undefined,
		})
			.then((data) => {
				setPayments(data);
				if (data.length) {
					setEmptyResult(false);
				} else {
					setEmptyResult(true);
				}
				setLoading(false);
			})
			.catch(() => {
				setEmptyResult(true);
				setLoading(false);
			});
	}, [filters, user._id]);

	const toTopUp = useCallback(() => {
		navigation("/top-up");
	}, [navigation]);

	const openFiltersHandler = () => {
		if (!isOpenFilters) {
			setTemporaryFilters({
				status: filters.status,
				currency: filters.currency,
			});
		}
		setIsOpenFilters(!isOpenFilters);
	};

	const applyFilters = () => {
		setFilters({ page: 0, ...temporaryFilters });
		openFiltersHandler();
	};

	const statusHandler = (status: string) => {
		setTemporaryFilters((prev) => ({
			...prev,
			status: status as PaymentStatusEnum,
		}));
	};

	const currencyHandler = (currency: string) => {
		setTemporaryFilters((prev) => ({
			...prev,
			currency: currency as CurrenciesEnum,
		}));
	};

	return (
		<WebAppProvider>
			<Header
				title={"История пополнений баланса"}
				logo={
					<div className={styles.logo}>
						<TopUpHistory />
					</div>
				}
			/>
			<Card
				className={styles.list}
				title={
					<div
						className={styles.filterLogo}
						onClick={() => !isOpenFilters && openFiltersHandler()}
					>
						<Filter />
						<Modal isOpen={isOpenFilters} onClose={openFiltersHandler}>
							<FilterForm
								filters={temporaryFilters}
								currencyHandler={currencyHandler}
								statusHandler={statusHandler}
							/>
						</Modal>
					</div>
				}
			>
				{loading ? (
					<PageLoader />
				) : (
					payments.map((payment) => (
						<PaymentCard
							{...payment}
							reLoad={reLoad}
							key={`payment-card--${payment._id}`}
							userId={user._id}
						/>
					))
				)}
				{emptyResult && <NothingFound />}
			</Card>

			<BackButton onClick={toTopUp} />
			{isOpenFilters && (
				<MainButton text={"Применить фильтры"} onClick={applyFilters} />
			)}
		</WebAppProvider>
	);
};

export function Component() {
	const data = useLoaderData() as { user: User };
	return (
		<Suspense fallback={<PageLoader />}>
			<Await resolve={data.user}>
				<History />
			</Await>
		</Suspense>
	);
}
