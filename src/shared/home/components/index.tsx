import React from "react";
import styles from "shared/home/components/home.module.less";
import Balance from "shared/home/components/balance";
import Subscribe from "shared/home/components/subscribe";
import Navigation from "shared/home/components/navigation";
import { get } from "services/api";
import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";
import { User } from "shared/home/interfaces/user.interface";
import { ISubscription } from "shared/subscription/interfaces/subscription.interface";

export async function loader() {
	// @ts-ignore
	const user = window.Telegram.WebApp.initDataUnsafe?.user;
	const userDataPromise = await get<User>(`user/${user.id}`, {});
	const subscriptionDataPromise = await get<Array<ISubscription>>(
		`/subscription`,
		{
			query: {
				isActive: true,
			},
		}
	);
	const promises = Promise.all([userDataPromise, subscriptionDataPromise]);
	return defer({ promiseData: promises });
}

function Home() {
	const [user, subscriptionData] = useAsyncValue() as [
		user: User,
		subscriptionData: Array<ISubscription>,
	];
	console.log(user, subscriptionData);
	return (
		<div className={styles.wrapper}>
			<Balance amount={user.balance.amount} />
			<Subscribe
				isActive={!!subscriptionData.length}
				expiredDate={subscriptionData[0] && subscriptionData[0].expiredDate}
			/>
			<Navigation />
		</div>
	);
}

export function Component() {
	const data = useLoaderData() as {
		promiseData: [user: User, subscriptionData: ISubscription];
	};
	console.log(data);
	return (
		<Await resolve={data.promiseData}>
			<Home />
		</Await>
	);
}
