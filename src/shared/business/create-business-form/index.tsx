import React, { useCallback, useEffect, useState } from "react";
import Slider from "shared/components/slider";
import InputText from "shared/components/input/input-text";
import styles from "./business-form.module.css";
import { useTelegram } from "hooks/useTelegram";
import {
	getBusiness,
	getCategories,
} from "shared/business/create-business-form/services/data";
import {Select} from "antd";

const CreateBusinessForm = () => {
	const { tg } = useTelegram();
	// const categories = getCategories();
	const [data, setData] = useState({
		title: "",
		description: "",
		categoryId: "",
		address: "",
		contacts: "",
		preview: "",
	});
	const [categories, setCategories] = useState({});

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

	const Categories = (
		<div>
			<Select>

			</Select>
		</div>
	);

	const steps = [InputTitle, Description];

	useEffect(() => {
		setCategories(getCategories());
	}, []);

	return (
		<div className={styles.wrapper}>
			<Slider steps={steps} finishButtonText={"Сохранить"} />
		</div>
	);
};

export default CreateBusinessForm;
