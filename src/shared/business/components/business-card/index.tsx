import React, { useState } from "react";
import { getBusiness } from "shared/business/data";
import {
	Await,
	defer,
	useAsyncValue,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import { Business } from "shared/business/dto/business.dto";
import { ReactComponent as Share } from "public/assets/icons/share.svg";
import Header from "shared/components/header";
import styles from "shared/business/components/business-card/business-card.module.less";
import RoundButton from "shared/business/components/business-card/components/round-button";
import Description from "shared/business/components/business-card/components/description";
import AddressBlock from "shared/business/components/business-card/components/address";
import Contacts from "shared/business/components/business-card/components/contacts";
import {
	AlignCenterOutlined,
	ContactsOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import { BackButton } from "@vkruglikov/react-telegram-web-app";
import { useTelegram } from "hooks/useTelegram";
import { message } from "antd";

export async function loader({
	params: { businessId },
}: {
	params: { businessId?: string };
}) {
	const data = getBusiness(`${businessId}`);
	return defer({ data });
}

function BusinessCard() {
	const { preview, address, contacts, title, description, avgCheck, _id } =
		useAsyncValue() as Business;
	const [active, setActive] = useState(0);
	const navigate = useNavigate();
	const handleBack = () => {
		navigate("/business");
	};
	const { user } = useTelegram();
	const successMessage = (text: string) => {
		message.success(text);
	};

	const errorMessage = (text: string) => {
		message.error(text);
	};

	const linkData = {
		page: `/business/${_id}`,
		ref: String(user.id),
	};
	const dataString = JSON.stringify(linkData);
	const encodedData = btoa(dataString);

	const writeToClipboard = () => {
		window.navigator.clipboard
			.writeText(
				`https://t.me/${import.meta.env.VITE_BOTNAME}/${
					import.meta.env.VITE_WEBAPPNAME
				}?startapp=${encodedData}&startApp=${encodedData}`
			)
			.then(
				() => successMessage("Адрес скопирован в буффер обмена!"),
				() => errorMessage("При копировании произошла ошибка")
			);
	};

	const components = [
		{
			value: (
				<Description>
					<div>{description}</div>
					<div className={styles.linkWrapper}></div>
				</Description>
			),
			title: "Описание",
			icon: <AlignCenterOutlined className={styles.icon} />,
		},
		{
			value: <AddressBlock address={address} />,
			title: "Адрес",
			icon: <HomeOutlined className={styles.icon} />,
		},
		{
			value: <Contacts contacts={contacts} />,
			title: "Контакты",
			icon: <ContactsOutlined className={styles.icon} />,
		},
	];

	return (
		<div>
			{window.history.length > 1 && <BackButton onClick={handleBack} />}
			{window.history.length > 1 && <BackButton onClick={handleBack} />}
			<Header
				title={
					<div>
						<div>{title}</div>
						<div className={styles.avgCheck}>
							{Array(3)
								.fill(0)
								.map((_, index) => {
									return (
										<span
											className={
												index <= avgCheck ? styles.activeAvgCheck : undefined
											}
										>
											$
										</span>
									);
								})}
						</div>
					</div>
				}
				fillBackground={!!preview}
				logo={
					preview ? (
						<img
							src={`https://${preview.domain}/${preview.bucket}/${preview.key}`}
							alt={preview.key}
							className={styles.logo}
						/>
					) : (
						<div className={styles.noLogo}>Без логотипа</div>
					)
				}
			/>
			<div className={styles.businessNavigation}>
				{components.map((component, index) => {
					return (
						<RoundButton
							title={component.title}
							callBack={() => setActive(index)}
							logo={component.icon}
							isActive={active === index}
							key={`raw-button-${component.title}`}
						/>
					);
				})}
			</div>
			<div className={styles.contentWrapper}>
				<div>{components[active].value}</div>
				<div className={styles.copyIconWrapper} onClick={writeToClipboard}>
					<div>Поделиться</div>
					<div className={styles.copyIcon}>
						<Share />
					</div>
				</div>
			</div>
		</div>
	);
}

export function Component() {
	const data = useLoaderData() as {
		data: Business;
	};
	return (
		<Await resolve={data.data}>
			<BusinessCard />
		</Await>
	);
}
