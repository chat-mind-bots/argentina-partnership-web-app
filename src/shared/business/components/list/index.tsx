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
import {
	BusinessContext,
	BusinessDispatchContext,
} from "shared/business/context/businesses.context";
import { BusinessActionKind } from "shared/business/provider/businesses.provider";
import InputText from "shared/components/input/input-text";
import { Button } from "antd";
import { GetBusinessesInterface } from "shared/business/interfaces/query/get-businesses.interface";

const LIMITONPAGE = 4;

export async function loader() {
	const data = getBusinesses({ page: 0, limit: LIMITONPAGE });
	return defer({ data });
}

const BusinessList = () => {
	const data = useAsyncValue() as BusinessesDto;
	const [business, setBusiness] = useState(data.data);
	const [q, setQ] = useState<string>("");
	const [maxPage, setMaxPage] = useState(Math.ceil(data.total / LIMITONPAGE));
	const [params, setParams] = useState<GetBusinessesInterface>({
		page: 1,
		limit: LIMITONPAGE,
	});
	const [currentPage, setPage] = useState(1);

	const { ref, inView } = useInView({
		delay: 500,
	});

	const handleOnChangeQ = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQ(event.target.value);
	};

	const handleOnScroll = async () => {
		if (inView) {
			if (currentPage < maxPage) {
				const businessesData = await getBusinesses({
					page: currentPage,
					limit: LIMITONPAGE,
					q: q ? q : undefined,
				});
				setPage((prevState) => prevState + 1);
				setBusiness((prevState) => [...prevState, ...businessesData.data]);
			}
		}
	};

	const handleOnSearch = async () => {
		setPage(1);
		const businessData = await getBusinesses({
			page: 0,
			limit: LIMITONPAGE,
			q: q ? q : undefined,
		});
		setBusiness(businessData.data);
		setMaxPage(Math.ceil(businessData.total / LIMITONPAGE));
	};

	useEffect(() => {
		console.log(inView);
		handleOnScroll();
	}, [inView]);

	useEffect(() => {}, [params]);

	return (
		<div>
			<div>
				<InputText value={q} type={"standard"} onChange={handleOnChangeQ} />
				<Button
					onClick={() => {
						setPage(0);
						handleOnSearch();
					}}
				>
					Отправить
				</Button>
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
								key={`mini-card--${_id}`}
								ref={data.data.length - 1 === index ? ref : undefined}
							>
								<BusinessMiniCard
									title={title}
									category={category.title}
									avgCheck={avgCheck}
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
