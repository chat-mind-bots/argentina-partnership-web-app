import React from "react";
import styles from "shared/home/components/navigation/navigation.module.less";
import { ReactComponent as Business } from "public/assets/icons/business.svg";
import { ReactComponent as AngleRight } from "public/assets/icons/angle-right.svg";
import { ReactComponent as Qr } from "public/assets/icons/qr.svg";
import { ReactComponent as Information } from "public/assets/icons/help.svg";
import { ReactComponent as Partnership } from "public/assets/icons/partnership.svg";
import { ReactComponent as TariffPlans } from "public/assets/icons/tariff.svg";
import NavigationButton from "shared/home/components/navigation/navigation-button";
import Card from "shared/components/card";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
	const navigate = useNavigate();
	return (
		<Card title={"Возможности пллатформы"}>
			<NavigationButton
				onClick={() => navigate("/partners")}
				logo={
					<div className={styles.logo}>
						<Business />
					</div>
				}
			>
				<div className={styles.content}>
					<span>Посмотреть список партнеров</span>
					<AngleRight />
				</div>
			</NavigationButton>
			<NavigationButton
				onClick={() => navigate("/tariffs")}
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
				<div className={`${styles.content}`}>
					<span>Показать QR-код</span>
					<AngleRight />
				</div>
			</NavigationButton>
			<NavigationButton
				onClick={() => navigate("/partnership")}
				logo={
					<div className={styles.logo}>
						<Partnership />
					</div>
				}
			>
				<div className={`${styles.content}`}>
					<span>Сотрудничество</span>
					<AngleRight />
				</div>
			</NavigationButton>
			<Link to={"https://t.me/kurkul608"} target={"_blank"}>
				<NavigationButton
					logo={
						<div className={styles.logo}>
							<Information />
						</div>
					}
				>
					<div className={`${styles.content} ${styles.last}`}>
						<span>Помощь</span>
						<AngleRight />
					</div>
				</NavigationButton>
			</Link>
		</Card>
	);
};

export default Navigation;
