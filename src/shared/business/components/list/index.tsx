import React, { Suspense, useEffect, useState } from "react";
import PageLoader from "shared/components/page-loader";
import {
	Await,
	defer,
	NavLink,
	useAsyncValue,
	useLoaderData,
} from "react-router-dom";
import { getBusinesses } from "shared/business/data";
import { Business } from "shared/business/dto/business.dto";
import { BusinessesDto } from "shared/business/dto/businesses.dto";
import ContentLayout from "shared/components/content-layout";
import styles from "./list.module.less";
import Filter from "public/assets/icons/filter.svg";
import BusinessMiniCard from "shared/business/components/list/components/business-mini-card";
import { useInView } from "react-intersection-observer";
import InputText from "shared/components/input/input-text";
import { Button } from "antd";
import { GetBusinessesInterface } from "shared/business/interfaces/query/get-businesses.interface";
import useDebounce from "hooks/useDebounce";

const LIMITONPAGE = 4;

export async function loader() {
	const data = getBusinesses({ page: 0, limit: LIMITONPAGE });
	return defer({ data });
}

const BusinessList = () => {
	const data = useAsyncValue() as BusinessesDto;
	const [business, setBusiness] = useState(data.data);
	// const [q, setQ] = useState<string>("");
	const [maxPage, setMaxPage] = useState(Math.ceil(data.total / LIMITONPAGE));
	const [params, setParams] = useState<GetBusinessesInterface>({
		page: 1,
		limit: LIMITONPAGE,
	});
	// const [currentPage, setPage] = useState(1);
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
		console.log(inView);
		console.log(maxPage);
	}, [inView]);

	useEffect(() => {
		console.log(maxPage);
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
		<div>
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
					<div className={styles.buttonWrapper}>
						<button className={styles.filterButton}>
							<Filter />
						</button>
					</div>
				}
			>
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
								ref={data.data.length - 1 === index ? ref : undefined}
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
		</div>
	);
};

export const Component = () => {
	const data = useLoaderData() as {
		data: Business[];
	};
	return (
		<Suspense fallback={<PageLoader />}>
			<Await resolve={data.data}>
				<BusinessList />
			</Await>
		</Suspense>
	);
};
