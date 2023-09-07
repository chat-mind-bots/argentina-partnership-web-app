import React, { FC } from "react";
import styles from "shared/payment/components/payment-info/pay-instruction/pay-instruction.module.less";
import { ReactComponent as Copy } from "public/assets/icons/copy.svg";
import { NetworksEnum } from "shared/payment/interfaces/networks.enum";
import ContentLayout from "shared/components/content-layout";
import { getNetworkTitle } from "shared/payment/services/get-network-title";
import { message } from "antd";
import { getCryptoAddressService } from "shared/payment/services/get-crypto-address.service";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import Card from "shared/components/card";

interface IOwnProps {
	method: NetworksEnum;
	isActive: boolean;
	toApprove(): void;
}
const PayInstruction: FC<IOwnProps> = ({ method, toApprove, isActive }) => {
	const successMessage = (text: string) => {
		message.success(text);
	};

	const errorMessage = (text: string) => {
		message.error(text);
	};

	const writeToClipboard = () => {
		window.navigator.clipboard
			.writeText(getCryptoAddressService(method) as string)
			.then(
				() => successMessage("Адрес скопирован в буффер обмена!"),
				() => errorMessage("При копировании произошла ошибка")
			);
	};

	return (
		<Card className={styles.card}>
			<ContentLayout headerPrimary={"Инструкция по оплате"}>
				<div className={styles.content}>
					<p>
						Для оплаты вы выбрали сеть: <b>{getNetworkTitle(method)}</b>.
					</p>
					<p>Адрес для оплаты:</p>
					<p
						className={styles.address}
						title={"Нажать, чтобы скопировать"}
						onClick={writeToClipboard}
					>
						<Copy />{" "}
						<span className={styles.ellipsis}>
							{getCryptoAddressService(method)}
						</span>
					</p>
					<p>
						<b>Внимание!</b> Не забывайте делать <b>скриншот</b> об успешной
						оплате, или
						<b>TxId</b> (Id Транзакции в сети)
					</p>
					<p>
						Для подтверждения оплаты заполните перейдите во вкладку
						&#171;Подтверждение оплаты&#187; или нажмите кнопку ниже
					</p>
					{isActive && (
						<MainButton
							text={"Перейти к подтверждению оплаты"}
							onClick={toApprove}
						/>
					)}
					<p>
						После подтверждения оплаты - ваши средства будут зачислены в течении
						24 часов
					</p>
				</div>
			</ContentLayout>
		</Card>
	);
};

export default PayInstruction;
