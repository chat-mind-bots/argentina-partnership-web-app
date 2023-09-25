import React, { useCallback } from "react";
import { ReactComponent as Ok } from "public/assets/icons/ok.svg";
import { ReactComponent as NotOk } from "public/assets/icons/notOk.svg";
import styles from "shared/home/components/subscribe/subscribe.module.less";
import Flat from "shared/components/flat";
import { useNavigate } from "react-router-dom";
import { getLeftTime } from "shared/home/services/get-time.service";

interface SubscribeProps {
	isActive: boolean;
	expiredDate?: string;
}

const Subscribe = ({ expiredDate, isActive }: SubscribeProps) => {
	const navigation = useNavigate();
	const toTariff = useCallback(() => {
		navigation("/tariffs");
	}, [navigation]);

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
				{expiredDate && <span>{getLeftTime(expiredDate)}</span>}
			</Flat>
		</div>
	);
};

export default Subscribe;
