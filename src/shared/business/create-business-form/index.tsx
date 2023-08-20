import React, { useEffect, useState } from "react";
import Slider from "shared/components/slider";
import styles from "./business-form.module.css";
import { useTelegram } from "hooks/useTelegram";
import {
	CategoriesDto,
	Category,
} from "shared/business/create-business-form/dto/categories.dto";
import {
	createBusiness,
	getCategories,
	updateBusiness,
} from "shared/business/create-business-form/services/data";

import {
	Business,
	CreateBusiness,
	IContacts,
} from "shared/business/create-business-form/types/create-business.interface";
import FormContact from "shared/business/create-business-form/form-contact";
import FormTitle from "shared/business/create-business-form/form-title";
import FormDescription from "shared/business/create-business-form/form-description";
import FormCategories from "shared/business/create-business-form/form-category";
import FormAddress from "shared/business/create-business-form/form-address";
import FormResult from "shared/business/create-business-form/form-result";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import { useLoaderData } from "react-router-dom";
import FormPreview from "shared/business/create-business-form/form-preview";

export async function loader(): Promise<CategoriesDto> {
	const data = await getCategories();
	return data;
}

export interface BusinessFormProps {
	initialState?: Business;
	businessId?: string;
}

export interface SelectProps {
	label: string;
	value: string;
}

export function Component({ initialState, businessId }: BusinessFormProps) {
	const { user } = useTelegram();
	const [data, setData] = useState<CreateBusiness>({
		title: "",
		description: "",
		categoryName: "",
		address: {
			isExist: false,
		},
		contacts: [] as IContacts[],
		preview: "",
	});
	const [isEmpty, setIsEmpty] = useState(true);
	const [hideButtons, setHideButtons] = useState(false);
	const [isValidLink, setIsValidLinkLink] = useState(true);
	const handleOnSend = async () => {
		if (businessId) {
			return updateBusiness(user?.id, businessId, data);
		}
		return createBusiness(user?.id, data);
	};
	const [maxSteps, setMaxSteps] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);

	const categories = useLoaderData() as Category[];
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

	useEffect(() => {
		if (initialState) {
			setData({
				title: initialState.title,
				categoryName: initialState.category.title,
				address: initialState.address,
				contacts: initialState.contacts,
				description: initialState.description,
				preview: initialState.preview,
			});
		}
	}, [initialState]);
	console.log(data);
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
		<FormPreview
			currentStep={currentStep}
			maxSteps={maxSteps}
			onChange={setData}
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
			isValidLink={isValidLink}
			maxSteps={maxSteps}
			setValidLink={setIsValidLinkLink}
			setData={setData}
			isEmptyCallback={setIsEmpty}
			currentStep={currentStep}
		/>,
	];

	useEffect(() => {
		setMaxSteps(steps.length);
	}, [steps]);

	return (
		<WebAppProvider>
			<div className={styles.wrapper}>
				<Slider
					hideButtons={hideButtons}
					steps={steps}
					activeStep={currentStep}
					isValidLink={isValidLink}
					setActiveStep={setCurrentStep}
					finishButtonText={"Сохранить"}
					isNextButtonDisabled={isEmpty}
					onSendData={handleOnSend}
				>
					<FormResult mode={businessId ? "update" : "create"} />
				</Slider>
			</div>
		</WebAppProvider>
	);
}
