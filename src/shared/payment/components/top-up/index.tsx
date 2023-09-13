import React, { Suspense, useCallback, useContext, useState } from "react";
import {
	BackButton,
	MainButton,
	useShowPopup,
	WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import {
	Await,
	defer,
	useAsyncValue,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import { ReactComponent as History } from "public/assets/icons/history.svg";
import ContentLayout from "shared/components/content-layout";
import InputText from "shared/components/input/input-text";
import Description from "shared/components/description";
import { get } from "services/api";
import { User } from "shared/home/interfaces/user.interface";
import { createPayment } from "shared/payment/services/data";
import { CurrenciesEnum } from "shared/payment/interfaces/currencies.enum";
import Select from "shared/components/select";
import { networkOptions } from "shared/payment/services/network-options";
import { NetworksEnum } from "shared/payment/interfaces/networks.enum";
import PageLoader from "shared/components/page-loader";
import styles from "shared/payment/components/top-up/top-up.module.less";
import { PaymentContext } from "shared/context/payment/payment.context";

export async function loader() {
	// @ts-ignore
	const user = window.Telegram.WebApp.initDataUnsafe?.user;
	const userDataPromise = get<User>(`user/${user.id}`, {});
	return defer({ userDataPromise });
}

function TopUp() {
	const [value, setValue] = useState<{
		amount: string;
		network?: NetworksEnum;
	}>({
		amount: "",
	});
	const { updatePayments } = useContext(PaymentContext);
	const [progress, setProgress] = useState(false);

	const showPopup = useShowPopup();
	const data = useAsyncValue() as User;

	const sendPayment = useCallback(
		(amount: number, network: NetworksEnum) => {
			createPayment(data._id, {
				currency: CurrenciesEnum.USDT,
				amount,
				method: network,
			})
				.then(async () => {
					await showPopup({
						message: "Запрос на пополнение успешно создан создан",
					});
					updatePayments && updatePayments();
					setProgress(false);
				})
				.catch(async () => {
					await showPopup({
						message: "Во время создания запроса на пополнение произошла ошибка",
					});
					updatePayments && updatePayments();
					setProgress(false);
				});
		},
		[data]
	);
	const navigation = useNavigate();

	const toHome = useCallback(() => {
		navigation("/home");
	}, [navigation]);

	const toHistory = useCallback(() => {
		navigation("/my-payments");
	}, [navigation]);

	const handleAmount = (text: string) => {
		setValue({ ...value, amount: text });
	};

	const handleNetwork = (network?: string) => {
		setValue({ ...value, network: network as NetworksEnum });
	};

	// @ts-ignore
	return (
		<WebAppProvider>
			<ContentLayout
				headerPrimary={"Пополнить баланс"}
				headerSecondary={
					<button className={styles.historyButton} onClick={toHistory}>
						<History />
					</button>
				}
			>
				<InputText
					type={"numeric"}
					value={value.amount}
					placeholder={"Количество USDT"}
					onChange={handleAmount}
					description={
						<Description
							primary={
								"Введите сумму USDT, на которую  вы хотите пополнить  свой баланс"
							}
							secondary={"Например: 14"}
						/>
					}
				/>
			</ContentLayout>
			<ContentLayout headerPrimary={"Выберите сеть"}>
				<Select
					options={networkOptions}
					value={value.network as string}
					placeholder={"Выберете сеть"}
					onChange={handleNetwork}
					showSearch={true}
					description={
						<Description
							primary={"Выберите сеть, в которой будет произведен платеж"}
							secondary={"Например: Tron (TRC20)"}
						/>
					}
				/>
			</ContentLayout>
			<BackButton onClick={toHome} />
			{value.amount && value.network && (
				<MainButton
					text={"Пополнить"}
					onClick={() => {
						setProgress(true);
						sendPayment(+value.amount, value.network!);
					}}
					progress={progress}
				/>
			)}
		</WebAppProvider>
	);
}

export function Component() {
	const data = useLoaderData() as { userDataPromise: User };
	return (
		<Suspense fallback={<PageLoader />}>
			<Await resolve={data.userDataPromise}>
				<TopUp />
			</Await>
		</Suspense>
	);
}
