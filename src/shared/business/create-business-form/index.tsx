import React, { useEffect, useState } from "react";
import Slider from "shared/components/slider";
import InputText from "shared/components/input/input-text";
import styles from "./business-form.module.css";
import { useTelegram } from "hooks/useTelegram";
import { Select } from "antd";
import { Category } from "shared/business/create-business-form/types/categories.dto";

export interface BusinessFormProps {
	categories: Category[];
}

export interface SelectProps {
	label: string;
	value: string;
}

const CreateBusinessForm = ({ categories }: BusinessFormProps) => {
	const { tg } = useTelegram();
	// const categories = getCategories();
	const [data, setData] = useState({
		title: "",
		description: "",
		categoryName: "",
		address: "",
		contacts: "",
		preview: "",
	});

	const InputTitle = (
		<div>
			<h2 className={styles.formHeader}>Введите название бизнеса:</h2>
			<InputText
				className={styles.formInput}
				value={data.title}
				placeholder={"Название"}
				fieldName={"title"}
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
				onChange={setData}
			/>
		</div>
	);
	const onChange = (str: string) => {
		const index = categories.findIndex((value, index) => {
			return value.title === str;
		});
		console.log(index);
		if (index > -1) {
			console.log(index);
			setData((value) => {
				return { ...value, categoryName: categories[index].title };
			});
		}
	};
	const onSearch = (value: any) => {
		console.log("search:", value);
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
					className={styles.formSelect}
					value={data.categoryName}
					placeholder="Выберете категорию"
					optionFilterProp="children"
					onChange={onChange}
					onSearch={onSearch}
					filterOption={(input, option) =>
						(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
					}
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
				placeholder={"улица, дом"}
				fieldName={"address"}
				onChange={setData}
			/>
		</div>
	);

	const Preview = (
		<div>
			<h2 className={styles.formHeader}>Ваши контакты:</h2>
			<InputText
				className={styles.formInput}
				value={data.preview}
				placeholder={"ссылка на фото"}
				fieldName={"preview"}
				onChange={setData}
			/>
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
			<Slider steps={steps} finishButtonText={"Сохранить"} />
		</div>
	);
};

export default CreateBusinessForm;
