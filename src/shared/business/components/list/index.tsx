import React, { useEffect, useState } from "react";
import {
	Await,
	defer,
	NavLink,
	useAsyncValue,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import { getBusinesses, getCategories } from "shared/business/data";
import { BusinessesDto } from "shared/business/dto/businesses.dto";
import ContentLayout from "shared/components/content-layout";
import styles from "./list.module.less";
import { ReactComponent as Filter } from "public/assets/icons/filter.svg";
import BusinessMiniCard from "shared/business/components/list/components/business-mini-card";
import { useInView } from "react-intersection-observer";
import InputText from "shared/components/input/input-text";
import { GetBusinessesInterface } from "shared/business/interfaces/query/get-businesses.interface";
import {
	BackButton,
	MainButton,
	WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import Modal from "shared/components/modal";
import ListFilter from "shared/business/components/list/components/list-filter";
import { Category } from "shared/business/dto/categories.dto";
import { Business, StatusEnum } from "shared/business/dto/business.dto";
import { useFormik } from "formik";
import List from "shared/components/list/list";
import ListSkeleton from "shared/business/components/list/components/skeleton/list-skeleton";

const LIMITONPAGE = 15;

export async function loader() {
	// const businesses = getBusinesses({ page: 0, limit: LIMITONPAGE });
	const categories = getCategories();
	const dataPromise = Promise.all([categories]);
	return defer({ dataPromise });
}

const BusinessList = () => {
	const [categories] = useAsyncValue() as [Category[]];
	const [business, setBusiness] = useState<Business[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [maxPage, setMaxPage] = useState(0);
	const [params, setParams] = useState<Omit<GetBusinessesInterface, "limit">>({
		page: 0,
	});
	const [tempParams, setTempParams] = useState<
		Omit<GetBusinessesInterface, "limit">
	>({
		page: 0,
	});
	const navigate = useNavigate();
	const navigateToMain = () => {
		navigate("/home");
	};

	const { submitForm, handleSubmit, values, setFieldValue } = useFormik({
		initialValues: {
			isEmptyResult: false,
			isOpenFilters: false,
			isFocusSearch: false,
		},
		enableReinitialize: true,
		onSubmit: () => {
			setIsLoading(true);
			setFieldValue("isEmptyResult", false);
			getBusinesses({
				...params,
				page: params.page,
				status: StatusEnum.ACTIVE,
				limit: LIMITONPAGE,
			})
				.then((res) => {
					setBusiness((prev) =>
						params.page === 0 ? res.data : [...prev, ...res.data]
					);
					setFieldValue("isEmptyResult", !res.data.length);
					const maxPage =
						Math.ceil(res.total / LIMITONPAGE) < 1
							? 1
							: Math.ceil(res.total / LIMITONPAGE);
					setMaxPage(maxPage);
					setFieldValue("maxPage", maxPage);
					setIsLoading(false);
				})
				.catch(() => {
					setIsLoading(false);
				});
		},
	});

	const handleFilters = () => {
		setParams((prevState) => ({
			...prevState,
			...tempParams,
			page: prevState.page < maxPage ? prevState.page + 1 : prevState.page,
		}));
	};

	const handleSubmitForm = () => {
		setParams({ ...tempParams, page: 0 });
		setBusiness([]);
	};

	useEffect(() => {
		submitForm();
	}, []);

	useEffect(() => {
		params.page < maxPage && submitForm();
	}, [params]);

	const { ref, inView } = useInView({
		delay: 500,
	});

	useEffect(() => {
		!isLoading && handleOnScroll();
	}, [inView]);

	const setFocusSearch = (value: boolean) => {
		setFieldValue("isFocusSearch", value);
	};

	const handleOnChangeQ = (text: string) => {
		setTempParams((prev) => {
			return { ...prev, q: text };
		});
	};

	const handleOnChangeCategory = (value: string) => {
		setTempParams((prevState) => {
			return { ...prevState, category: value };
		});
	};

	const openFiltersHandler = () => {
		setFieldValue("isOpenFilters", !values.isOpenFilters);
	};

	const handleOnScroll = () => {
		if (inView && params.page < maxPage) {
			handleFilters();
		}
	};
	const mas = [1, 2, 3, 4, 5];

	return (
		<WebAppProvider>
			<div>
				<div className={styles.contentWrapper}>
					<form onSubmit={handleSubmit}>
						<InputText
							value={tempParams.q || ""}
							type={"standard"}
							placeholder={"Поиск по партнерам"}
							onFocus={() => {
								setFocusSearch(true);
							}}
							onBlur={() => {
								setFocusSearch(false);
							}}
							onChange={handleOnChangeQ}
						/>
					</form>
				</div>
				{values.isFocusSearch && (
					<MainButton text={"Поиск"} onClick={handleSubmitForm} />
				)}
			</div>
			<ContentLayout
				headerPrimary={"Наши партнеры:"}
				headerSecondary={
					<div
						className={styles.buttonWrapper}
						onClick={() => !values.isOpenFilters && openFiltersHandler()}
					>
						<button className={styles.filterButton}>
							<Filter />
						</button>
					</div>
				}
			>
				<Modal
					isOpen={values.isOpenFilters}
					onClose={openFiltersHandler}
					title={"Фильтры"}
				>
					<ListFilter
						list={categories}
						params={tempParams}
						onChange={handleOnChangeCategory}
					/>
					{values.isOpenFilters && (
						<MainButton
							text={"Применить фильтры"}
							onClick={() => {
								handleSubmitForm();
								openFiltersHandler();
							}}
						/>
					)}
				</Modal>
				{mas.map((elem) => (
					<div>{elem}</div>
				))}
				<div className={styles.contentWrapper}>
					<List
						mas={business}
						skeleton={<ListSkeleton />}
						skeletonCount={LIMITONPAGE}
						renderFunction={({ _id, avgCheck, category, preview, title }) => {
							return (
								<NavLink to={`${_id}`} key={`nav-link--${_id}`}>
									<BusinessMiniCard
										title={title}
										category={category.title}
										avgCheck={avgCheck}
										updateImageState={() => {
											setBusiness((prevState) =>
												// prevState.map((prevBusiness) => prevBusiness._id === _id ? {...prevBusiness, isLoadingImage: false} : prevBusiness)
												prevState.map((prevBusiness) =>
													prevBusiness._id === _id
														? { ...prevBusiness }
														: prevBusiness
												)
											);
										}}
										key={`mini-card--${_id}`}
										preview={
											preview &&
											`https://${preview.domain}/${preview.bucket}/${preview.key}`
										}
									/>
								</NavLink>
							);
						}}
						isLoading={isLoading}
					/>
					<div ref={ref} className={styles.infinityLoader} />
					{values.isEmptyResult && (
						<div>По вашему запросу ничего не найдено...</div>
					)}
				</div>
			</ContentLayout>
			<BackButton onClick={navigateToMain} />
		</WebAppProvider>
	);
};

export const Component = () => {
	const data = useLoaderData() as {
		dataPromise: [BusinessesDto, Category[]];
	};
	return (
		<Await resolve={data.dataPromise}>
			<BusinessList />
		</Await>
	);
};
