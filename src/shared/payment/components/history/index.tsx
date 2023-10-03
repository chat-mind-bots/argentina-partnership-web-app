import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PaymentInterface } from "../../interfaces/payment.interface";
import { PaymentStatusEnum } from "../../interfaces/payment-statuses.enum";
import { getMyPayments } from "../../services/data";
import { CurrenciesEnum } from "../../interfaces/currencies.enum";
import {
	BackButton,
	MainButton,
	WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import { ReactComponent as TopUpHistory } from "public/assets/icons/top-up-history.svg";
import { ReactComponent as Filter } from "public/assets/icons/filter.svg";
import Header from "../../../components/header";
import styles from "./history.module.less";
import Card from "../../../components/card";
import Modal from "../../../components/modal";
import FilterForm from "./filter-form";
import PageLoader from "../../../components/page-loader";
import PaymentCard from "./card";
import NothingFound from "../../../components/nothing-found";
import { useInView } from "react-intersection-observer";

interface IFilters extends IFiltersForm {
	page: number;
}

export interface IFiltersForm {
	status?: PaymentStatusEnum;
	currency?: CurrenciesEnum;
}

const LIMITONPAGE = 10;

const History = () => {
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

	const navigation = useNavigate();

	const reLoad = () => {
		setFilters({ page: 0 });
	};

	useEffect(() => {
		setLoading(true);
		getMyPayments({
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
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}, [filters]);

	useEffect(() => {
		!loading && handleOnScroll();
	}, [inView]);

	const handleOnScroll = () => {
		if (inView && filters.page < maxPage - 1) {
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
						payments.map((payment, index) => {
							if (index === payments.length - 1) {
								return (
									<div
										className={styles.infinityLoaderWrapper}
										key={`payment-card--${payment._id}`}
									>
										<PaymentCard
											{...payment}
											reLoad={reLoad}
											userId={payment.user}
										/>
										<div className={styles.infinityLoader} ref={ref} />
									</div>
								);
							}
							return (
								<PaymentCard
									{...payment}
									reLoad={reLoad}
									key={`payment-card--${payment._id}`}
									userId={payment.user}
								/>
							);
						})
					)}
				</div>
				{!filters.page && <div className={styles.infinityLoader} ref={ref} />}
				{/*<div className={styles.infinityLoader} ref={ref} />*/}
				{payments.length === 0 && <NothingFound />}
			</Card>

			<BackButton onClick={toTopUp} />
			{isOpenFilters && (
				<MainButton text={"Применить фильтры"} onClick={applyFilters} />
			)}
		</WebAppProvider>
	);
};

export default History;
