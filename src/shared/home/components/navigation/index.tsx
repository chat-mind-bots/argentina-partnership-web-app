import React from "react";
import styles from "shared/home/components/navigation/navigation.module.less";
import Business from "public/assets/icons/business.svg";
import AngleRight from "public/assets/icons/angle-right.svg";
import Qr from "public/assets/icons/qr.svg";
import TariffPlans from "public/assets/icons/tariff.svg";
import NavigationButton from "shared/home/components/navigation/navigation-button";
import Card from "shared/components/card";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
	const navigate = useNavigate();
	return (
		<Card title={"Возможности пллатформы"}>
			<NavigationButton
				logo={
					<div className={styles.logo}>
						<Business />
					</div>
				}
			>
				<div className={styles.content}>
					<span>Посмотреть список акций</span>
					<AngleRight />
				</div>
			</NavigationButton>
			<NavigationButton
				logo={
					<div className={styles.logo}>
						<TariffPlans />
					</div>
				}
			>
				<div className={styles.content}>
					<span>Тарифы</span>
					<AngleRight />
				</div>
			</NavigationButton>
			<NavigationButton
				onClick={() => navigate("/qr-generate")}
				logo={
					<div className={styles.logo}>
						<Qr />
					</div>
				}
			>
				<div className={`${styles.content} ${styles.last}`}>
					<span>Показать QR-код</span>
					<AngleRight />
				</div>
			</NavigationButton>
		</Card>
	);
};

export default Navigation;
