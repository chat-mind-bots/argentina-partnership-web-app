import React from "react";
import PageLoader from "shared/components/page-loader";

interface ListProps {
	mas: Array<any>;
	renderFunction: (item: any) => React.ReactNode;
	isLoading: boolean;
	skeleton?: React.ReactNode;
}

const List = ({ mas, renderFunction, isLoading, skeleton }: ListProps) => {
	return (
		<div>
			{mas.map((item) => renderFunction(item))}
			{isLoading && (skeleton || <PageLoader />)}
		</div>
	);
};

export default List;
