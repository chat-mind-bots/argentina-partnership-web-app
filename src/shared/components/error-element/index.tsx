import React from "react";
import { Button } from "antd";
import {
	Link,
	useNavigate,
	useNavigation,
	useLocation,
} from "react-router-dom";
import { BackButton } from "@vkruglikov/react-telegram-web-app";

import styles from "./error-element.module.less";

export interface ErrorElementProps {
	icon: React.ReactElement;
	title: string;
	href: string;
	buttonTitle: string;
	secondaryTitle?: string;
}

const ErrorElement = ({
	icon,
	title,
	href,
	secondaryTitle,
	buttonTitle,
}: ErrorElementProps) => {
	const navigate = useNavigate();
	const toPreviousPage = () => {
		navigate(-1);
	};
	return (
		<div className={styles.wrapper}>
			<div className={styles.iconWrapper}>{icon}</div>
			<div className={styles.titleWrapper}>
				<div>{title}</div>
				<div className={styles.secondaryTitle}>{secondaryTitle}</div>
			</div>
			<Link to={href}>
				<Button type={"primary"}>{buttonTitle}</Button>
			</Link>
			{window.history.length > 1 && <BackButton onClick={toPreviousPage} />}
		</div>
	);
};

export default ErrorElement;
