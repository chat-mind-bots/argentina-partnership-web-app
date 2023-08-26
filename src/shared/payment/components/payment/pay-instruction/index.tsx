import React, { FC } from "react";
import styles from "./pay-instruction.module.less";
import Copy from "public/assets/icons/copy.svg";
import { NetworksEnum } from "shared/payment/interfaces/networks.enum";
import ContentLayout from "shared/components/content-layout";
import { getNetworkTitle } from "shared/payment/services/get-network-title";

interface IOwnProps {
	method: NetworksEnum;
	amount: number;
}
const PayInstruction: FC<IOwnProps> = ({ method, amount }) => {
	const writeToClipboard = () => {
		window.navigator.clipboard
			.writeText("TQvxpD3noy3WYy2zW3UceUGhXkxph4dvth")
			.then(
				(success) => console.log("text copied"),
				(err) => console.log("error copying text")
			);
	};
	return (
		<ContentLayout headerPrimary={"Инструкция по оплате"}>
			<div>
				<p>Для оплаты вы выбрали сеть {getNetworkTitle(method)}.</p>
				<p>Адрес для оплаты:</p>
				<p
					className={styles.address}
					title={"Нажать, чтобы скопировать"}
					onClick={writeToClipboard}
				>
					TQvxpD3noy3WYy2zW3UceUGhXkxph4dvth <Copy />
				</p>
			</div>
		</ContentLayout>
	);
};

export default PayInstruction;
