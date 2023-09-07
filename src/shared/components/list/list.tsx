import React from "react";
import PageLoader from "shared/components/page-loader";

interface ListProps<T> {
	mas: Array<T>;
	renderFunction: (item: T) => React.ReactNode;
	isLoading: boolean;
	skeleton?: React.ReactNode;
	skeletonCount?: number;
}

const List = <T extends unknown>({
	mas,
	renderFunction,
	isLoading,
	skeleton,
	skeletonCount,
}: ListProps<T>) => {
	return (
		<div>
			{mas.map((item) => renderFunction(item))}
			{isLoading &&
				(Array(skeletonCount || 1)
					.fill(0)
					.map(() => skeleton) || <PageLoader />)}
		</div>
	);
};

export default List;
