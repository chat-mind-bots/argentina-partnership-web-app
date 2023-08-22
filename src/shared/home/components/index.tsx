import React from "react";
import styles from "shared/home/components/home.module.less";
import Balance from "shared/home/components/balance";
import Subscribe from "shared/home/components/subscribe";
import Navigation from "shared/home/components/navigation";
import { get } from "services/api";
import { useLoaderData } from "react-router-dom";
import { User } from "shared/home/interfaces/user.interface";

export async function loader(): Promise<any> {
	// @ts-ignore
	const user = window.Telegram.WebApp.initDataUnsafe?.user;

	return get<User>(`user/${user.id}`, {});
}

export function Component() {
	const data = useLoaderData() as User;
	return (
		<div className={styles.wrapper}>
			<Balance amount={data.balance.amount} />
			<Subscribe />
			<Navigation />
		</div>
	);
}
