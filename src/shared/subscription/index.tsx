import React, { useCallback, useState } from "react";
import { get, post } from "services/api";
import {
	Await,
	defer,
	useAsyncValue,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import { ITariff } from "shared/subscription/interfaces/tariff.inteface";
import { Button, Radio, RadioChangeEvent } from "antd";
import { BackButton, MainButton } from "@vkruglikov/react-telegram-web-app";
import { ISubscription } from "shared/subscription/interfaces/subscription.interface";
import Modal from "shared/components/modal";

import styles from "./subscription.module.less";
import NothingFound from "shared/components/nothing-found";

export async function loader() {
	const tariffDataPromise = await get<Array<ITariff>>(`/tariff`, {});
	const subscriptionDataPromise = await get<Array<ISubscription>>(
		`/subscription`,
		{
			query: {
				isActive: true,
			},
		}
	);
	const promises = Promise.all([tariffDataPromise, subscriptionDataPromise]);
	return defer({
		promiseData: promises,
	});
}

const SubscriptionTariff = () => {
	const [value, setValue] = useState(0);
	const [tariffData, subscriptionData] = useAsyncValue() as [
		tariffData: Array<ITariff>,
		subscriptionData: Array<ISubscription>,
	];
	const [isOpenSubmit, setOpenSubmit] = useState(false);
	const [pending, setPending] = useState(false);
	const navigation = useNavigate();
	const toHome = useCallback(() => {
		navigation("/home");
	}, [navigation]);
	const handleOnClickModal = () => {
		setOpenSubmit(!isOpenSubmit);
	};
	const handleOnCloseModal = () => {
		setOpenSubmit(false);
	};
	const handleOnClick = async () => {
		setPending(true);
		try {
			const purchase = await post("purchase", {
				body: {
					items: [
						{
							item: tariffData[value],
						},
					],
				},
			});
			toHome();
		} finally {
			setPending(false);
			handleOnCloseModal();
		}
	};
	const handleOnChange = (e: RadioChangeEvent) => setValue(e.target.value);
	return (
		<div>
			<div className={styles.headerWrapper}>Тарифы</div>
			<div className={styles.pageDescription}>
				5% скидка на все товары и услуги
			</div>
			<Radio.Group
				value={value}
				onChange={handleOnChange}
				className={styles.radioWrapper}
			>
				{tariffData.length &&
					tariffData.map(({ title, _id, period, price }, index) => {
						return (
							<Radio key={`raw-tariff-data--${title}`} value={index}>
								{title}
							</Radio>
						);
					})}
			</Radio.Group>
			{!tariffData.length && (
				<NothingFound className={styles.pageDescription} />
			)}
			<div className={styles.buttonWrapper}>
				{!isOpenSubmit && (
					<MainButton
						onClick={handleOnClickModal}
						disabled={!!subscriptionData.length}
						text={`К оплате ${tariffData[value].price}$`}
					/>
				)}
			</div>
			<BackButton onClick={toHome} />
			{tariffData.length && (
				<Modal
					isOpen={isOpenSubmit}
					onClose={handleOnCloseModal}
					title={"Ваш счет"}
				>
					<div className={styles.subDescription}>
						<span className={styles.titleSubscription}>Тариф: </span>
						{tariffData[value].title}
					</div>
					<div className={styles.subDescription}>
						<span className={styles.titleSubscription}>Цена: </span>
						{tariffData[value].price}$
					</div>
					<div className={styles.subDescription}>
						{tariffData[value].description && (
							<div className={styles.titleSubscription}>
								<span className={styles.titleSubscription}>Описание: </span>
								{tariffData[value].description}
							</div>
						)}
					</div>
					<div
						className={`${styles.subDescription} ${styles.buttonDescription}`}
					>
						Вы дейстительно хотите приобрести подписку?
					</div>
					{isOpenSubmit && (
						<MainButton
							onClick={handleOnClick}
							progress={pending}
							text={`Оформить за ${tariffData[value].price}$`}
						/>
					)}
				</Modal>
			)}
		</div>
	);
};

export const Component = () => {
	const data = useLoaderData() as {
		promiseData: [tariffData: Array<ITariff>, subscriptionData: ISubscription];
	};

	return (
		<Await resolve={data.promiseData}>
			<SubscriptionTariff />
		</Await>
	);
};

export default SubscriptionTariff;
