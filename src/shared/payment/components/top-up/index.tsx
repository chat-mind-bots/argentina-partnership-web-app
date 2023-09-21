import React, { useCallback, useContext, useState } from "react";
import {
	BackButton,
	MainButton,
	useShowPopup,
	WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import { useNavigate } from "react-router-dom";
import { ReactComponent as History } from "public/assets/icons/history.svg";
import ContentLayout from "shared/components/content-layout";
import InputText from "shared/components/input/input-text";
import Description from "shared/components/description";
import { createPayment } from "shared/payment/services/data";
import { CurrenciesEnum } from "shared/payment/interfaces/currencies.enum";
import Select from "shared/components/select";
import { networkOptions } from "shared/payment/services/network-options";
import { NetworksEnum } from "shared/payment/interfaces/networks.enum";
import styles from "shared/payment/components/top-up/top-up.module.less";
import { PaymentContext } from "shared/context/payment/payment.context";
import { PaymentTypeEnum } from "shared/payment/interfaces/payment-type.enum";
import { paymentTypeOptions } from "shared/payment/services/payment-type-options";
import { getPaymentTypeDescription } from "shared/payment/services/get-payment-type-title";

function TopUp() {
	const [value, setValue] = useState<{
		amount: string;
		paymentType: PaymentTypeEnum;
		network?: NetworksEnum;
	}>({
		amount: "",
		paymentType: PaymentTypeEnum.CRYPTOMUS,
	});
	const { updatePayments } = useContext(PaymentContext);
	const [progress, setProgress] = useState(false);

	const showPopup = useShowPopup();

	const sendPayment = useCallback(
		(amount: number, network: NetworksEnum, paymentType: PaymentTypeEnum) => {
			createPayment({
				currency: CurrenciesEnum.USDT,
				amount,
				method: network,
				paymentType: paymentType,
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
		[]
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

	const handlePaymentType = (paymentType?: string) => {
		setValue({ ...value, paymentType: paymentType as PaymentTypeEnum });
	};
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
			<ContentLayout headerPrimary={"Выберите тип платежа"}>
				<Select
					options={paymentTypeOptions}
					value={value.paymentType as string}
					placeholder={"тип платежа"}
					onChange={handlePaymentType}
					showSearch={true}
					description={
						<Description
							primary={getPaymentTypeDescription(value.paymentType)}
						/>
					}
				/>
			</ContentLayout>
			{value.paymentType === PaymentTypeEnum.MANUAL && (
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
			)}
			<BackButton onClick={toHome} />
			{value.amount &&
				(value.network || value.paymentType === PaymentTypeEnum.CRYPTOMUS) && (
					<MainButton
						text={"Пополнить"}
						onClick={() => {
							setProgress(true);
							sendPayment(+value.amount, value.network!, value.paymentType);
						}}
						progress={progress}
					/>
				)}
		</WebAppProvider>
	);
}
export default TopUp;
