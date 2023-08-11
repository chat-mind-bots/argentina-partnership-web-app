import React, { useCallback, useEffect, useState } from "react";
import Slider from "shared/components/slider";
import InputText from "shared/components/input/input-text";
import styles from "./business-form.module.css";
import { useTelegram } from "hooks/useTelegram";

const CreateBusinessForm = () => {
	const { tg } = useTelegram();
	const [owner, setOwner] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [address, setAddress] = useState("");
	const [contacts, setContacts] = useState("");
	const [preview, setPreview] = useState("");

	const InputTitle = (
		<div>
			<h2>Введите название бизнеса:</h2>
			<InputText value={title} placeholder={"Название"} onChange={setTitle} />
		</div>
	);

	const Description = (
		<div>
			<h2>Введите описание бизнеса:</h2>
			<InputText
				value={description}
				placeholder={"Описание"}
				onChange={setDescription}
			/>
		</div>
	);

	const steps = [InputTitle, Description];

	const onSendData = useCallback(() => {
		const business = {
			title,
			description,
		};
		tg.sendData(JSON.stringify(business));
	}, [title, description]);

	return (
		<div className={styles.wrapper}>
			<Slider
				steps={steps}
				finishButtonText={"Сохранить"}
				onSendData={onSendData}
			/>
		</div>
	);
};

export default CreateBusinessForm;
