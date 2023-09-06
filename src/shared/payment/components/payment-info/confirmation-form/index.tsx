import React, { FC, useCallback, useState } from "react";
import ContentLayout from "shared/components/content-layout";
import Description from "shared/components/description";
import InputText from "shared/components/input/input-text";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { message } from "antd";
import { patch } from "services/api";
import UploadPhoto from "shared/components/upload-photo";
import Card from "shared/components/card";
import styles from "shared/payment/components/payment-info/confirmation-form/confirmation-form.module.less";

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

	const handleTxId = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTxId(event.target.value);
	};

	const sendConfirmation = useCallback(() => {
		patch(`payment/to-review/${paymentId}`, {
			query: { userId },
			body: { data: { txId, photo } },
		})
			.then(() => {
				message.success("Данные успешно подтверждены");
				toPaymentInfo();
			})
			.catch((err) => {
				message.error(err.message);
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
									"0f2e1a2ae7117ba4ce8e3c19e368fa545a4cdaf7274e1n1764f9d6062d38f598"
								}
							/>
						}
					/>
					<p>Загрузить фото</p>
					<UploadPhoto
						onChange={(url) => {
							setPhoto(url);
						}}
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
