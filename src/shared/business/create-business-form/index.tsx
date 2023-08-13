import React, { useEffect, useState } from "react";
import Slider from "shared/components/slider";
import InputText from "shared/components/input/input-text";
import styles from "./business-form.module.css";
import { useTelegram } from "hooks/useTelegram";
import { Category } from "shared/business/create-business-form/types/categories.dto";
import Select from "shared/components/select";
import { createBusiness } from "shared/business/create-business-form/services/data";
import { Button, Upload } from "antd";

export interface BusinessFormProps {
	categories: Category[];
}

export interface SelectProps {
	label: string;
	value: string;
}

const CreateBusinessForm = ({ categories }: BusinessFormProps) => {
	const { tg, user } = useTelegram();
	// const categories = getCategories();
	const [data, setData] = useState({
		title: "",
		description: "",
		categoryName: "",
		address: "",
		contacts: "",
		preview: "",
	});
	const [isEmpty, setIsEmpty] = useState(true);
	const handleOnSend = () => {
		return createBusiness(user.id, data);
	};
	const InputTitle = (
		<div>
			<h2 className={styles.formHeader}>Введите название бизнеса:</h2>
			<InputText
				className={styles.formInput}
				value={data.title}
				placeholder={"Название"}
				fieldName={"title"}
				isEmptyCallback={setIsEmpty}
				onChange={setData}
			/>
		</div>
	);

	const Description = (
		<div>
			<h2 className={styles.formHeader}>Введите описание бизнеса:</h2>
			<InputText
				className={styles.formInput}
				value={data.description}
				placeholder={"Описание"}
				fieldName={"description"}
				isEmptyCallback={setIsEmpty}
				onChange={setData}
			/>
		</div>
	);
	const onChange = (str: string) => {
		const index = categories.findIndex((value, index) => {
			return value.title === str;
		});
		if (index > -1) {
			setData((value) => {
				return { ...value, categoryName: categories[index].title };
			});
		}
	};
	const dataCategory: SelectProps[] = [];
	if (categories)
		categories.map((category) => {
			dataCategory.push({
				label: category.title,
				value: category.title,
			});
		});

	const Categories = (
		<div>
			<h2 className={styles.formHeader}>Выберете категорию бизнеса:</h2>
			<div>
				<Select
					showSearch
					value={data.categoryName}
					placeholder="Выберете категорию"
					onChange={onChange}
					isEmptyCallback={setIsEmpty}
					options={dataCategory}
				/>
			</div>
		</div>
	);

	const Contacts = (
		<div>
			<h2 className={styles.formHeader}>Ваши контакты:</h2>
			<InputText
				className={styles.formInput}
				value={data.contacts}
				isEmptyCallback={setIsEmpty}
				placeholder={"телефон"}
				fieldName={"contacts"}
				onChange={setData}
			/>
		</div>
	);

	const Address = (
		<div>
			<h2 className={styles.formHeader}>Ваши контакты:</h2>
			<InputText
				className={styles.formInput}
				value={data.address}
				isEmptyCallback={setIsEmpty}
				placeholder={"улица, дом"}
				fieldName={"address"}
				onChange={setData}
			/>
		</div>
	);

	const Preview = (
		<div>
			<h2 className={styles.formHeader}>Ваши контакты:</h2>
			<Upload className={styles.formInput} type={"select"}>
				<Button>Click to Upload</Button>
			</Upload>
		</div>
	);

	const steps = [
		InputTitle,
		Description,
		Categories,
		Address,
		Contacts,
		Preview,
	];

	useEffect(() => {
		console.log(data);
		console.log(categories);
	}, [data]);

	return (
		<div className={styles.wrapper}>
			<Slider
				steps={steps}
				finishButtonText={"Сохранить"}
				isNextButtonDisabled={isEmpty}
				onSendData={handleOnSend}
				finishText={"Бизнес был успешно создан"}
			/>
		</div>
	);
};

export default CreateBusinessForm;
