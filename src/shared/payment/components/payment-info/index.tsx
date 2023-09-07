import React, { FC, lazy, Suspense, useState } from "react";
import styles from "./info.module.less";
import { PaymentInterface } from "shared/payment/interfaces/payment.interface";
import { getCurrencyTitleService } from "shared/payment/services/get-currency-title.service";
import { dateToCustomString } from "services/date-formatters";
import { getPointColorService } from "shared/payment/services/get-point-color.service";
import Point from "shared/components/point";
import { getPaymentStatusService } from "shared/payment/services/get-payment-status.service";
import { PaymentStatusEnum } from "shared/payment/interfaces/payment-statuses.enum";
import { get } from "services/api";
import { User } from "shared/home/interfaces/user.interface";
import {
	Await,
	defer,
	useAsyncValue,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import { Tabs } from "antd";
import PageLoader from "shared/components/page-loader";
import { getPayment } from "shared/payment/services/data";
import { BackButton, WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import Card from "shared/components/card";

const ConfirmationForm = lazy(
	() => import("shared/payment/components/payment-info/confirmation-form")
);

const PayInstruction = lazy(
	() => import("shared/payment/components/payment-info/pay-instruction")
);

export async function loader({
	params: { paymentId },
}: {
	params: { paymentId?: string };
}) {
	// @ts-ignore
	const user = window.Telegram.WebApp.initDataUnsafe?.user;

	const data = await get<User>(`user/${user.id}`, {}).then(async (userData) => {
		return paymentId
			? getPayment(userData._id, paymentId as string).then((paymentData) => ({
					user: userData,
					payment: paymentData,
			  }))
			: { user: userData };
	});
	return defer(data);
}

const Info: FC = () => {
	const { payment } = useAsyncValue() as {
		user: User;
		payment?: PaymentInterface;
	};

	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState(
		payment && (payment.status !== PaymentStatusEnum.PENDING || !payment.method)
			? "1"
			: "2"
	);
	return (
		<div className={styles.list}>
			<WebAppProvider>
				{!payment && <div>Введены неверные данные</div>}
				{payment && (
					<Tabs
						activeKey={activeTab}
						onChange={(activeKey) => setActiveTab(activeKey)}
						className={styles.popup}
						items={[
							{
								label: "Информация по платежу",
								key: "1",
								children: (
									<Card className={styles.card}>
										<div className={styles.row}>
											<span className={styles.title}>Статус</span>
											<span className={styles.description}>
												{getPaymentStatusService(payment.status)}
												{getPointColorService(payment.status) && (
													<Point
														color={
															getPointColorService(payment.status) as string
														}
													/>
												)}
											</span>
										</div>
										<div className={styles.row}>
											<span className={styles.title}>Дата</span>
											<span className={styles.description}>
												{dateToCustomString(new Date(payment.createdAt))}
											</span>
										</div>
										<div className={styles.row}>
											<span className={styles.title}>Сумма пополнения</span>
											<span className={styles.description}>
												{payment.amount}
											</span>
										</div>
										<div className={styles.row}>
											<span className={styles.title}>Валюта</span>
											<span className={styles.description}>
												{getCurrencyTitleService(payment.currency)}
											</span>
										</div>
									</Card>
								),
							},
							{
								label: "Инструкция по оплате",
								key: "2",
								disabled:
									payment.status !== PaymentStatusEnum.PENDING ||
									!payment.method,
								children: (
									<PayInstruction
										isActive={activeTab === "2"}
										toApprove={() => setActiveTab("3")}
										method={payment.method!}
									/>
								),
							},
							{
								label: "Подтверждение оплаты",
								key: "3",
								disabled:
									payment.status !== PaymentStatusEnum.PENDING ||
									!payment.method,
								children: (
									<Suspense fallback={<PageLoader />}>
										<ConfirmationForm
											isActive={activeTab === "3"}
											toPaymentInfo={() => setActiveTab("1")}
											paymentId={payment._id}
											userId={payment.user}
										/>
									</Suspense>
								),
							},
						]}
					/>
				)}
				<BackButton onClick={() => navigate("/my-payments")} />
			</WebAppProvider>
		</div>
	);
};

export function Component() {
	const data = useLoaderData() as { user: User; payment: PaymentInterface };
	return (
		<Suspense fallback={<PageLoader />}>
			<Await resolve={data}>
				<Info />
			</Await>
		</Suspense>
	);
}
