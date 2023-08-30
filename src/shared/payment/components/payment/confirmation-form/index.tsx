import React, { FC, useCallback, useState } from "react";
import ContentLayout from "shared/components/content-layout";
import Description from "shared/components/description";
import InputText from "shared/components/input/input-text";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { message } from "antd";
import { patch } from "services/api";
import UploadPhoto from "shared/components/upload-photo";

interface IOwnProps {
	paymentId: string;
	userId: string;
	onClose(): void;
}
const ConfirmationForm: FC<IOwnProps> = ({ paymentId, userId, onClose }) => {
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
			})
			.catch((err) => {
				message.error(err.message);
			});

		onClose();
	}, []);
	return (
		<div>
			<ContentLayout headerPrimary={"Введите TxId"}>
				<InputText
					type={"standard"}
					value={txId}
					placeholder={"Название"}
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
			</ContentLayout>
		</div>
	);
};

export default ConfirmationForm;
