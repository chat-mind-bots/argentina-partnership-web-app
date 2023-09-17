import React, { useCallback } from "react";
import { ReactComponent as Ok } from "public/assets/icons/ok.svg";
import { ReactComponent as NotOk } from "public/assets/icons/notOk.svg";
import styles from "shared/home/components/subscribe/subscribe.module.less";
import Flat from "shared/components/flat";
import { useNavigate } from "react-router-dom";

interface SubscribeProps {
	isActive: boolean;
	expiredDate?: string;
}

const Subscribe = ({ expiredDate, isActive }: SubscribeProps) => {
	const navigation = useNavigate();
	const toTariff = useCallback(() => {
		navigation("/tariffs");
	}, [navigation]);

	const getLeftDays = (expiredDate: string) => {
		return Math.ceil(
			(new Date(expiredDate).valueOf() - new Date().valueOf()) /
				(1000 * 60 * 60 * 24)
		);
	};
	return (
		<div
			className={`${styles.wrapper} ${!isActive && styles.isNotActive}`}
			onClick={() => {
				!isActive && toTariff();
			}}
		>
			<Flat
				logo={
					<div className={styles.logo}>{isActive ? <Ok /> : <NotOk />}</div>
				}
			>
				{isActive ? <span>Осталось</span> : <span>Приобрести подписку</span>}
				{/*<span>Подписка</span>*/}
				{expiredDate && <span>{getLeftDays(expiredDate)} дней</span>}
			</Flat>
		</div>
	);
};

export default Subscribe;
