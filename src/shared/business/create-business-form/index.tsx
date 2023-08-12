import React, { useCallback, useEffect, useState } from "react";
import Slider from "shared/components/slider";
import InputText from "shared/components/input/input-text";
import styles from "./business-form.module.css";
import { useTelegram } from "hooks/useTelegram";
import { getCategories } from "shared/business/create-business-form/services/data";

const CreateBusinessForm = () => {
	const { tg } = useTelegram();
	const categories = getCategories();
	const [data, setData] = useState({
		title: "",
		description: "",
		categoryId: "",
		address: "",
		contacts: "",
		preview: "",
	});

	const InputTitle = (
		<div>
			<h2>Введите название бизнеса:</h2>
			<InputText
				value={data.title}
				placeholder={"Название"}
				fieldName={"title"}
				onChange={setData}
			/>
		</div>
	);
	useEffect(() => {
		console.log(categories);
		console.log(process.env.BASE_URL);
		console.log(process.env.BACKEND_ENDPOINT);
		console.log(process.env.REACT_MODE);
	}, []);
	const Description = (
		<div>
			<h2>Введите описание бизнеса:</h2>
			<InputText
				value={data.description}
				placeholder={"Описание"}
				fieldName={"description"}
				onChange={setData}
			/>
		</div>
	);

	const Categories = <div></div>;

	const steps = [InputTitle, Description];

	return (
		<div className={styles.wrapper}>
			<Slider steps={steps} finishButtonText={"Сохранить"} />
		</div>
	);
};

export default CreateBusinessForm;
