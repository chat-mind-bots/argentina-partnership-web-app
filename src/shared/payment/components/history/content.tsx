import React, { useCallback, useEffect, useState } from "react";
import { useAsyncValue, useNavigate, useSearchParams } from "react-router-dom";
import { User } from "../../../home/interfaces/user.interface";
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
import { IFiltersForm } from "./index";

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

export default History;
