import React, { useCallback, useState } from "react";
import {
	BackButton,
	MainButton,
	useShowPopup,
	WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import { useLoaderData, useNavigate } from "react-router-dom";
import ContentLayout from "shared/components/content-layout";
import InputText from "shared/components/input/input-text";
import Description from "shared/components/description";
import { get } from "services/api";
import { User } from "shared/home/interfaces/user.interface";
import { createPayment } from "shared/top-up/services/data";
import { CurrenciesEnum } from "shared/top-up/interfaces/currencies.enum";
import Select from "shared/components/select";
import { networkOptions } from "shared/top-up/services/network-options";
import { NetworksEnum } from "shared/top-up/interfaces/networks.enum";

export async function loader(): Promise<any> {
	// @ts-ignore
	const user = window.Telegram.WebApp.initDataUnsafe?.user;

	return get<User>(`user/${user.id}`, {});
}

export function Component() {
	const [value, setValue] = useState<{
		amount: string;
		network?: NetworksEnum;
	}>({
		amount: "",
	});
	const [progress, setProgress] = useState(false);

	const showPopup = useShowPopup();
	const data = useLoaderData() as User;

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
					setProgress(false);
				})
				.catch(async () => {
					await showPopup({
						message: "Во время создания запроса на пополнение произошла ошибка",
					});
					setProgress(false);
				});
		},
		[data]
	);
	const navigation = useNavigate();

	const toHome = useCallback(() => {
		navigation("/home");
	}, [navigation]);

	const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, amount: event.target.value });
	};

	const handleNetwork = (network?: string) => {
		setValue({ ...value, network: network as NetworksEnum });
	};

	return (
		<WebAppProvider>
			<ContentLayout headerPrimary={"Пополнить баланс"}>
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
				<Select
					options={networkOptions}
					value={value.network as string}
					placeholder={"Выберете сеть"}
					onChange={handleNetwork}
					showSearch={true}
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
