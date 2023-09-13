import React, { FC, useCallback, useContext, useState } from "react";
import ContentLayout from "shared/components/content-layout";
import Description from "shared/components/description";
import InputText from "shared/components/input/input-text";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { message } from "antd";
import { patch } from "services/api";
import UploadPhoto from "shared/components/upload-photo";
import Card from "shared/components/card";
import styles from "./confirmation-form.module.less";
import Ellipsis from "shared/components/ellipsis";
import { paymentToId } from "shared/payment/services/data";
import { PaymentContext } from "shared/context/payment/payment.context";

interface IOwnProps {
	paymentId: string;
	isActive: boolean;
	toPaymentInfo(): void;
	userId: string;
}
const ConfirmationForm: FC<IOwnProps> = ({
	paymentId,
	userId,
	toPaymentInfo,
}) => {
	const [txId, setTxId] = useState("");
	const [photo, setPhoto] = useState<string | undefined>();
	const { updatePayments } = useContext(PaymentContext);
	const handleTxId = (text: string) => {
		setTxId(text);
	};

	const sendConfirmation = useCallback(() => {
		paymentToId(userId, paymentId, txId, photo)
			.then(() => {
				message.success("Данные успешно подтверждены");
				updatePayments && updatePayments();
				toPaymentInfo();
			})
			.catch((err) => {
				message.error(err.message);
				toPaymentInfo();
				updatePayments && updatePayments();
			});
	}, [txId, photo]);
	return (
		<Card className={styles.card}>
			<ContentLayout
				headerPrimary={"Введите TxId или загрузите скриншот с подтверждением"}
			>
				<div className={styles.content}>
					<p>Ввести TxId</p>
					<InputText
						type={"standard"}
						value={txId}
						placeholder={"Введите TxId"}
						onChange={handleTxId}
						description={
							<Description
								primary={"Пример:"}
								secondary={
									<Ellipsis>
										{
											"0f2e1a2ae7117ba4ce8e3c19e368fa545a4cdaf7274e1n1764f9d6062d38f598"
										}
									</Ellipsis>
								}
							/>
						}
					/>
					<p>Загрузить фото</p>
					<UploadPhoto
						onChange={(url) => {
							setPhoto(url);
						}}
						defaultImage={photo}
					/>
					{(txId || photo) && (
						<MainButton
							text={"Отправить подтверждение оплаты"}
							onClick={sendConfirmation}
						/>
					)}
				</div>
			</ContentLayout>
		</Card>
	);
};

export default ConfirmationForm;
