import React, { useState } from "react";
import styles from "./confirmation-form.module.less";
import ContentLayout from "shared/components/content-layout";
import Description from "shared/components/description";
import InputText from "shared/components/input/input-text";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

const ConfirmationForm = () => {
	const [txId, setTxId] = useState("");

	const handleTxId = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTxId(event.target.value);
	};

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
				{txId && <MainButton text={"Отправить подтверждение оплаты"} />}
			</ContentLayout>
		</div>
	);
};

export default ConfirmationForm;
