import React, { useEffect, useState } from "react";
import { WebAppProvider, BackButton } from "@vkruglikov/react-telegram-web-app";
import styles from "./partnership.module.less";
import { Button } from "antd";
import {
	Await,
	defer,
	useAsyncValue,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import { get } from "services/api";
import { User } from "shared/home/interfaces/user.interface";
import PageLoader from "shared/components/page-loader";
import { createTicket, getTicket } from "shared/partnership/data";
import { TicketDto } from "shared/partnership/dto/ticket.dto";
import { getUserRoleHelper } from "shared/partnership/helpers/get-user-role.helper";

export async function loader() {
	// @ts-ignore
	const user = window.Telegram.WebApp.initDataUnsafe?.user;
	const userDataPromise = get<User>(`user/${user.id}`, {});
	return defer({ userData: userDataPromise });
}

const Partnership = () => {
	const data = useAsyncValue() as User;
	const [ticketAdmin, setTicketAdmin] = useState<TicketDto | undefined>();
	const [ticketPartner, setTicketPartner] = useState<TicketDto | undefined>();
	const [isTicketAdminCreated, setTicketAdminCreated] = useState(false);
	const [isTicketPartnerCreated, setTicketPartnerCreated] = useState(false);
	const [isLoadingTickets, setIsLoadingTickets] = useState<boolean>(true);
	const [isLoadingCreateTicket, setIsLoadingCreateTicket] =
		useState<boolean>(false);
	const navigate = useNavigate();
	const [active, setActive] = useState<number>(0);
	const isAdmin = getUserRoleHelper("ADMIN", data.role);
	const isPartner = getUserRoleHelper("PARTNER", data.role);

	useEffect(() => {
		const loadTickets = async () => {
			const partnerTicketPromise = getTicket(data._id, "PARTNER").then(
				(res) => {
					setTicketPartner(res);
				}
			);
			const adminTicketPromise = getTicket(data._id, "ADMIN").then((res) => {
				setTicketAdmin(res);
			});
			Promise.allSettled([partnerTicketPromise, adminTicketPromise]).then(
				() => {
					console.log(isLoadingTickets);
					setIsLoadingTickets(false);
					console.log(isLoadingTickets);
				}
			);
		};
		loadTickets();
	}, []);

	const handleOnCreateTicket = async (
		role: string,
		stateSetter: (value: boolean) => void
	) => {
		setIsLoadingCreateTicket(true);
		const result = await createTicket(data._id, role);
		result && setIsLoadingCreateTicket(false);
		result && stateSetter(true);
	};

	const navigateToMain = () => {
		navigate("/home");
	};
	const handleOnActiveClick = (num: number) => {
		setActive(num);
	};
	console.log(ticketPartner);
	console.log(ticketAdmin);
	return (
		<WebAppProvider>
			<div className={styles.contentWrapper}>
				<div className={styles.header}>Сотрудничество</div>
				<div className={styles.tabsWrapper}>
					<div
						className={`${styles.tab} ${
							active === 0 ? styles.activeTab : undefined
						}`}
						onClick={() => handleOnActiveClick(0)}
					>
						Партнер
					</div>
					<span>/</span>
					<div
						className={`${styles.tab} ${
							active === 1 ? styles.activeTab : undefined
						}`}
						onClick={() => handleOnActiveClick(1)}
					>
						Администратор
					</div>
				</div>
				{isLoadingTickets && <div>loading...</div>}
				{!isLoadingTickets && (
					<div>
						{active ? (
							<>
								{isAdmin && <div>Вы уже являетесь администратором </div>}
								{!ticketAdmin && !isAdmin && (
									<>
										<div className={styles.description}>
											Оставьте свою заявку на сотрудничество и мы рассмотрим ее
											в ближайшее врмея
										</div>
										<Button
											type={"primary"}
											disabled={isTicketAdminCreated}
											onClick={() =>
												handleOnCreateTicket("ADMIN", setTicketAdminCreated)
											}
											loading={isLoadingCreateTicket}
										>
											Я сотрудник / хочу стать
										</Button>
									</>
								)}
								{isTicketAdminCreated && (
									<div>Ваша заявка была успешно создана</div>
								)}
								{ticketAdmin && (
									<div className={styles.description}>
										<span>Статус заявки: </span>
										<span className={styles.status}>в обработке 🔄</span>
										<div>Ожадайте решения администратора</div>
									</div>
								)}
							</>
						) : (
							<>
								{isPartner && <div>Вы уже являетесь нашим партнером</div>}
								{!ticketPartner && !isPartner && (
									<>
										<div className={styles.description}>
											Оставьте свою заявку на сотрудничество и мы рассмотрим ее
											в ближайшее врмея
										</div>
										<Button
											type={"primary"}
											loading={isLoadingCreateTicket}
											disabled={isTicketPartnerCreated}
											onClick={() =>
												handleOnCreateTicket("PARTNER", setTicketPartnerCreated)
											}
										>
											Я владелец бизнеса
										</Button>
									</>
								)}
								{isTicketPartnerCreated && (
									<div>Ваша заявка была успешно создана</div>
								)}
								{ticketPartner && (
									<div className={styles.description}>
										<span>Статус заявки: </span>
										<span className={styles.status}>в обработке 🔄</span>
										<div>Ожадайте решения администратора</div>
									</div>
								)}
							</>
						)}
					</div>
				)}
				<BackButton onClick={navigateToMain} />
			</div>
		</WebAppProvider>
	);
};

export const Component = () => {
	const data = useLoaderData() as { userData: User };
	return (
		<Await resolve={data.userData}>
			<Partnership />
		</Await>
	);
};
