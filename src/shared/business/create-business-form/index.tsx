import React, { useEffect, useState } from "react";
import Slider from "shared/components/slider";
import InputText from "shared/components/input/input-text";
import styles from "./business-form.module.css";
import { useTelegram } from "hooks/useTelegram";
import { Category } from "shared/business/create-business-form/types/categories.dto";
import Select from "shared/components/select";
import { createBusiness } from "shared/business/create-business-form/services/data";

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
	const [maxSteps, setMaxSteps] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);
	const InputTitle = (
		<div>
			<div className={styles.headerWrapper}>
				<h2>Введите название бизнеса:</h2>
				<div className={styles.stepper}>
					{`${currentStep + 1} / ${maxSteps}`}
				</div>
			</div>
			<InputText
				className={styles.formInput}
				value={data.title}
				placeholder={"Название"}
				fieldName={"title"}
				isEmptyCallback={setIsEmpty}
				onChange={setData}
			/>
			<div className={styles.stepDescription}>
				<div className={styles.stepDescriptionTitle}>Пример:</div>
				<div>Додо пицца</div>
			</div>
		</div>
	);

	const Description = (
		<div>
			<div className={styles.headerWrapper}>
				<h2>Введите описание бизнеса:</h2>
				<div className={styles.stepper}>
					{`${currentStep + 1} / ${maxSteps}`}
				</div>
			</div>
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
			<div className={styles.headerWrapper}>
				<h2>Выберете категорию бизнеса:</h2>
				<div className={styles.stepper}>
					{`${currentStep + 1} / ${maxSteps}`}
				</div>
			</div>
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
			<div className={styles.headerWrapper}>
				<h2>Ваши контакты:</h2>
				<div className={styles.stepper}>
					{`${currentStep + 1} / ${maxSteps}`}
				</div>
			</div>
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
			<div className={styles.headerWrapper}>
				<h2>Ваши контакты:</h2>
				<div className={styles.stepper}>
					{`${currentStep + 1} / ${maxSteps}`}
				</div>
			</div>
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
			<div className={styles.headerWrapper}>
				<h2>Ваши контакты:</h2>
				<div className={styles.stepper}>
					{`${currentStep + 1} / ${maxSteps}`}
				</div>
			</div>
			<InputText
				className={styles.formInput}
				value={data.preview}
				isEmptyCallback={setIsEmpty}
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
		setMaxSteps(steps.length);
	}, [steps]);

	return (
		<div className={styles.wrapper}>
			<Slider
				steps={steps}
				activeStep={currentStep}
				setActiveStep={setCurrentStep}
				finishButtonText={"Сохранить"}
				isNextButtonDisabled={isEmpty}
				onSendData={handleOnSend}
				finishText={"Бизнес был успешно создан"}
			/>
		</div>
	);
};

export default CreateBusinessForm;
