import React, { Suspense, useEffect, useMemo, useState } from "react";
import PageLoader from "shared/components/page-loader";
import {
	Await,
	defer,
	NavLink,
	useAsyncValue,
	useLoaderData,
} from "react-router-dom";
import { getBusinesses, getCategories } from "shared/business/data";
import { Business } from "shared/business/dto/business.dto";
import { BusinessesDto } from "shared/business/dto/businesses.dto";
import ContentLayout from "shared/components/content-layout";
import styles from "./list.module.less";
import Filter from "public/assets/icons/filter.svg";
import BusinessMiniCard from "shared/business/components/list/components/business-mini-card";
import { useInView } from "react-intersection-observer";
import InputText from "shared/components/input/input-text";
import { GetBusinessesInterface } from "shared/business/interfaces/query/get-businesses.interface";
import useDebounce from "hooks/useDebounce";
import { MainButton, WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import Modal from "shared/components/modal";
import ListFilter from "shared/business/components/list/components/list-filter";
import { Category } from "shared/business/dto/categories.dto";
import { SelectProps } from "shared/business/components/create-business-form";

const LIMITONPAGE = 4;

export async function loader() {
	const businesses = getBusinesses({ page: 0, limit: LIMITONPAGE });
	const categories = getCategories();
	const dataPromise = Promise.all([businesses, categories]);
	return defer({ dataPromise });
}

const BusinessList = () => {
	const [businesses, categories] = useAsyncValue() as [
		BusinessesDto,
		Category[],
	];
	console.log(businesses, categories);
	const [business, setBusiness] = useState(businesses.data);
	const [isOpenFilters, setIsOpenFilters] = useState(false);
	const [maxPage, setMaxPage] = useState(
		Math.ceil(businesses.total / LIMITONPAGE)
	);
	const [params, setParams] = useState<GetBusinessesInterface>({
		page: 1,
		limit: LIMITONPAGE,
	});
	const debouncedValue = useDebounce(params, 500);

	const { ref, inView } = useInView({
		delay: 500,
	});

	const handleOnChangeQ = (event: React.ChangeEvent<HTMLInputElement>) => {
		setParams((prev: GetBusinessesInterface) => {
			return { ...prev, q: event.target.value };
		});
	};

	const handleOnChangePage = (value: number) => {
		setParams((prev: GetBusinessesInterface) => {
			return { ...prev, page: value };
		});
	};

	const applyFilters = () => {
		setIsOpenFilters(!isOpenFilters);
	};
	const openFiltersHandler = () => {
		setIsOpenFilters(!isOpenFilters);
	};

	const handleOnScroll = async () => {
		if (inView) {
			if (params.page < maxPage) {
				const businessesData = await getBusinesses({
					...params,
				});
				handleOnChangePage(params.page + 1);
				setBusiness((prevState) => [...prevState, ...businessesData.data]);
				setMaxPage(Math.ceil(businessesData.total / LIMITONPAGE));
			}
		}
	};

	const handleOnSearch = async () => {
		const businessData = await getBusinesses({
			...params,
			q: params.q ? params.q : undefined,
			page: 0,
		});
		handleOnChangePage(1);
		setBusiness(businessData.data);
		setMaxPage(Math.ceil(businessData.total / LIMITONPAGE));
	};

	useEffect(() => {
		handleOnScroll();
	}, [inView]);

	useEffect(() => {
		handleOnSearch();
	}, [
		debouncedValue.q,
		debouncedValue.limit,
		debouncedValue.category,
		debouncedValue["has-owner"],
		debouncedValue["sort-by"],
		debouncedValue["sort-order"],
	]);
	return (
		<WebAppProvider>
			<div>
				<InputText
					value={params.q || ""}
					type={"standard"}
					placeholder={"Поиск по бизнесам"}
					onChange={handleOnChangeQ}
				/>
			</div>
			<ContentLayout
				headerPrimary={"Наши партнеры:"}
				headerSecondary={
					<div
						className={styles.buttonWrapper}
						onClick={() => !isOpenFilters && openFiltersHandler()}
					>
						<button className={styles.filterButton}>
							<Filter />
						</button>
					</div>
				}
			>
				<Modal isOpen={isOpenFilters} onClose={openFiltersHandler}>
					<ListFilter
						setParams={setParams}
						categories={categories}
						params={params}
					/>
					{isOpenFilters && (
						<MainButton text={"Применить фильтры"} onClick={applyFilters} />
					)}
				</Modal>
				<div className={styles.contentWrapper}>
					{business.map(
						(
							{
								title,
								preview,
								avgCheck,
								category,
								_id,
								owner: { _id: ownerId },
							},
							index,
							array
						) => (
							<NavLink
								to={`/partner/${ownerId}/business/${_id}/`}
								key={`nav-link--${_id}`}
								ref={business.length - 1 === index ? ref : undefined}
							>
								<BusinessMiniCard
									title={title}
									category={category.title}
									avgCheck={avgCheck}
									key={`mini-card--${_id}`}
									preview={
										preview &&
										`https://${preview.domain}/${preview.bucket}/${preview.key}`
									}
								/>
							</NavLink>
						)
					)}
				</div>
			</ContentLayout>
		</WebAppProvider>
	);
};

export const Component = () => {
	const data = useLoaderData() as {
		dataPromise: [BusinessesDto, Category[]];
	};
	return (
		<Suspense fallback={<PageLoader />}>
			<Await resolve={data.dataPromise}>
				<BusinessList />
			</Await>
		</Suspense>
	);
};
