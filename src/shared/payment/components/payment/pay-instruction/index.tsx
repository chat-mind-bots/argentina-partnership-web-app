import React, { FC } from "react";
import styles from "./pay-instruction.module.less";
import Copy from "public/assets/icons/copy.svg";
import { NetworksEnum } from "shared/payment/interfaces/networks.enum";
import ContentLayout from "shared/components/content-layout";
import { getNetworkTitle } from "shared/payment/services/get-network-title";
import { message } from "antd";
import ConfirmationForm from "shared/payment/components/payment/confirmation-form";

interface IOwnProps {
	method: NetworksEnum;
	amount: number;
}
const PayInstruction: FC<IOwnProps> = ({ method, amount }) => {
	const successMessage = (text: string) => {
		message.success(text);
	};

	const errorMessage = (text: string) => {
		message.error(text);
	};

	const writeToClipboard = () => {
		window.navigator.clipboard
			.writeText("TQvxpD3noy3WYy2zW3UceUGhXkxph4dvth")
			.then(
				() => successMessage("Адрес скопирован в буффер обмена!"),
				() => errorMessage("При копировании произошла ошибка")
			);
	};

	return (
		<ContentLayout headerPrimary={"Инструкция по оплате"}>
			<div>
				<p>Для оплаты вы выбрали сеть: {getNetworkTitle(method)}.</p>
				<p>Адрес для оплаты:</p>
				<p
					className={styles.address}
					title={"Нажать, чтобы скопировать"}
					onClick={writeToClipboard}
				>
					<Copy /> TQvxpD3noy3WYy2zW3UceUGhXkxph4dvth
				</p>
				<p>
					Для подтверждения оплаты заполните форму снизу и нажать на кнопку
					подтверждения
				</p>
				<p>
					После заполнения вами формы - администрация проверит и подтвердит факт
					оплаты в течении 24 часов
				</p>
				<p>
					Вам нужно либо загрузить скриншот об ссупешной оплате, либо вставить
					ваш TxId в текстовое поле
				</p>
				<ConfirmationForm />
			</div>
		</ContentLayout>
	);
};

export default PayInstruction;
