import React, { Suspense } from "react";
import PageLoader from "shared/components/page-loader";
import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";
import { getBusinesses } from "shared/business/data";
import { Business } from "shared/business/dto/business.dto";
import { BusinessesDto } from "shared/business/dto/businesses.dto";
import ContentLayout from "shared/components/content-layout";
import styles from "./list.module.less";
import History from "public/assets/icons/history.svg";
import BusinessMiniCard from "shared/business/components/list/components/business-mini-card";

export async function loader() {
	const data = getBusinesses({ offset: 0, limit: 15 });
	return defer({ data });
}

const BusinessList = () => {
	const data = useAsyncValue() as BusinessesDto;
	return (
		<div>
			<ContentLayout
				headerPrimary={"Наши партнеры:"}
				headerSecondary={
					<div className={styles.buttonWrapper}>
						<button className={styles.filterButton}>
							<History />
						</button>
						<span>Фильтры</span>
					</div>
				}
			>
				<div className={styles.contentWrapper}>
					{data.data.map(({ title, preview, avgCheck, category }) => (
						<BusinessMiniCard
							title={title}
							category={category.title}
							avgCheck={avgCheck}
							preview={`https://${preview.domain}/${preview.bucket}/${preview.key}`}
							key={`mini-card--${title}`}
						/>
					))}
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
