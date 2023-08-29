import React, { Suspense } from "react";
import PageLoader from "shared/components/page-loader";
import { Await } from "react-router-dom";

export async function loader() {}

const BusinessList = () => {
	return <div>BusinessList</div>;
};

export const Component = () => {
	return (
		<Suspense fallback={<PageLoader />}>
			{/*<Await>*/}
			<BusinessList />
			{/*</Await>*/}
		</Suspense>
	);
};
