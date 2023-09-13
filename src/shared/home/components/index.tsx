import React, { Suspense } from "react";
import styles from "shared/home/components/home.module.less";
import Balance from "shared/home/components/balance";
import Subscribe from "shared/home/components/subscribe";
import Navigation from "shared/home/components/navigation";
import { get } from "services/api";
import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";
import { User } from "shared/home/interfaces/user.interface";
import PageLoader from "shared/components/page-loader";

export async function loader() {
	// @ts-ignore
	const user = window.Telegram.WebApp.initDataUnsafe?.user;
	const userDataPromise = get<User>(`user/${user.id}`, {});
	return defer({ userData: userDataPromise });
}

function Home() {
	const data = useAsyncValue() as User;
	return (
		<div className={styles.wrapper}>
			<Balance amount={data.balance.amount} />
			<Subscribe />
			<Navigation />
		</div>
	);
}

export function Component() {
	const data = useLoaderData() as { userData: User };
	return (
		<Suspense fallback={<PageLoader />}>
			<Await resolve={data.userData}>
				<Home />
			</Await>
		</Suspense>
	);
}
