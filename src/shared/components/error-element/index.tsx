import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { BackButton, MainButton } from "@vkruglikov/react-telegram-web-app";

import styles from "./error-element.module.less";
import { createBotStartLink } from "shared/router/services/create-bot-link.service";

export interface ErrorElementProps {
	icon: React.ReactElement;
	title: string;
	buttonTitle: string;
	secondaryTitle?: string;
	href?: string;
	isExternalLink?: boolean;
}

const ErrorElement = ({
	icon,
	title,
	href,
	secondaryTitle,
	isExternalLink,
	buttonTitle,
}: ErrorElementProps) => {
	const navigate = useNavigate();
	const toPreviousPage = () => {
		navigate(-1);
	};
	const toPage = (link: string) => {
		navigate(link);
	};
	return (
		<div className={styles.wrapper}>
			<div className={styles.iconWrapper}>{icon}</div>
			<div className={styles.titleWrapper}>
				<div>{title}</div>
				<div className={styles.secondaryTitle}>{secondaryTitle}</div>
			</div>
			{isExternalLink && (
				<Button type={"primary"} href={createBotStartLink()}>
					Перейти
				</Button>
			)}

			{!isExternalLink && (
				<MainButton
					text={buttonTitle}
					onClick={() => toPage(href ? href : "")}
				/>
			)}

			{window.history.length > 1 && <BackButton onClick={toPreviousPage} />}
		</div>
	);
};

export default ErrorElement;
