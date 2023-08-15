import React, { useEffect, useState } from "react";
import Slider from "shared/components/slider";
import styles from "./business-form.module.css";
import { useTelegram } from "hooks/useTelegram";
import { Category } from "shared/business/create-business-form/types/categories.dto";
import { createBusiness } from "shared/business/create-business-form/services/data";

import { IContacts } from "shared/business/create-business-form/types/create-business.interface";
import FormContact from "shared/business/create-business-form/form-contact";
import FormTitle from "shared/business/create-business-form/form-title";
import FormDescription from "shared/business/create-business-form/form-description";
import FormCategories from "shared/business/create-business-form/form-category";
import FormAddress from "shared/business/create-business-form/form-address";

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
		contacts: [] as IContacts[],
	});
	const [isEmpty, setIsEmpty] = useState(true);
	const [hideButtons, setHideButtons] = useState(false);
	const handleOnSend = () => {
		return createBusiness(user?.id || 250101824, data);
	};
	const [maxSteps, setMaxSteps] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);

	const onChangeCategory = (str: string) => {
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

	const steps = [
		<FormTitle
			currentStep={currentStep}
			value={data.title}
			onChange={setData}
			isEmptyCallback={setIsEmpty}
			maxSteps={maxSteps}
		/>,
		<FormDescription
			currentStep={currentStep}
			value={data.description}
			onChange={setData}
			isEmptyCallback={setIsEmpty}
			maxSteps={maxSteps}
		/>,
		<FormCategories
			dataCategory={dataCategory}
			currentStep={currentStep}
			value={data.categoryName}
			onChange={onChangeCategory}
			isEmptyCallback={setIsEmpty}
			maxSteps={maxSteps}
		/>,
		<FormContact
			maxSteps={maxSteps}
			currentStep={currentStep}
			values={data.contacts}
			hideButtonsCallback={setHideButtons}
			setData={setData}
		/>,
		<FormAddress
			value={data.address}
			onChange={setData}
			isEmptyCallback={setIsEmpty}
			maxSteps={maxSteps}
			currentStep={currentStep}
		/>,
	];
	useEffect(() => {
		setMaxSteps(steps.length);
	}, [steps]);
	return (
		<div className={styles.wrapper}>
			<Slider
				hideButtons={hideButtons}
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
