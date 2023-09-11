import React, { Suspense, lazy, useState, useEffect, useCallback } from "react";
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
import { PaymentInterface } from "../../interfaces/payment.interface";
import { useInView } from "react-intersection-observer";
import { getMyPayments } from "../../services/data";
import {
	BackButton,
	MainButton,
	WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import Header from "../../../components/header";
import Card from "../../../components/card";
import Modal from "../../../components/modal";
import FilterForm from "./filter-form";
import PaymentCard from "./card";
import NothingFound from "../../../components/nothing-found";
import { ReactComponent as TopUpHistory } from "public/assets/icons/top-up-history.svg";
import { ReactComponent as Filter } from "public/assets/icons/filter.svg";

// const History = lazy(() => import("shared/payment/components/history/content"));
export async function historyLoader() {
	// @ts-ignore
	const user = window.Telegram.WebApp.initDataUnsafe?.user;

	const userData = await get<User>(`user/${user.id}`, {});
	return userData;
}

interface IFilters extends IFiltersForm {
	page: number;
}

const LIMITONPAGE = 10;

export interface IFiltersForm {
	status?: PaymentStatusEnum;
	currency?: CurrenciesEnum;
}

export default function History() {
	const user = useLoaderData() as User;
	const [searchParams] = useSearchParams();
	const [maxPage, setMaxPage] = useState(1);
	const [payments, setPayments] = useState<PaymentInterface[]>([]);
	const [filters, setFilters] = useState<IFilters>({
		page: 0,
		status: searchParams.get("status")
			? (searchParams.get("status") as PaymentStatusEnum)
			: undefined,
	});
	const [temporaryFilters, setTemporaryFilters] = useState<IFiltersForm>({});

	const [isOpenFilters, setIsOpenFilters] = useState(false);

	const { ref, inView } = useInView({
		delay: 500,
	});

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
			limit: LIMITONPAGE,
			offset: filters.page * LIMITONPAGE,
			status: filters.status ? filters.status : undefined,
			currency: filters.currency ? filters.currency : undefined,
		})
			.then(({ data, total }) => {
				setPayments((prev) => (filters.page === 0 ? data : [...prev, ...data]));
				const maxPage =
					Math.ceil(total / LIMITONPAGE) < 1
						? 1
						: Math.ceil(total / LIMITONPAGE);
				setMaxPage(maxPage);
				if (payments.length) {
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

	useEffect(() => {
		!loading && handleOnScroll();
	}, [inView]);

	const handleOnScroll = () => {
		if (inView && filters.page < maxPage - 1) {
			console.log("filters", filters.page, maxPage);
			handleFilters();
		}
	};

	const handleFilters = () => {
		setFilters((prevState) => ({
			...prevState,
			page: prevState.page < maxPage ? prevState.page + 1 : prevState.page,
		}));
	};

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
				<div className={styles.contentWrapper}>
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
					<div className={styles.infinityLoader} ref={ref} />
				</div>
				{emptyResult && <NothingFound />}
			</Card>

			<BackButton onClick={toTopUp} />
			{isOpenFilters && (
				<MainButton text={"Применить фильтры"} onClick={applyFilters} />
			)}
		</WebAppProvider>
	);
}
