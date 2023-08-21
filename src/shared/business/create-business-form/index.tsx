import React, { useEffect, useMemo, useState } from "react";
import Slider from "shared/components/slider";
import styles from "./business-form.module.css";
import { useTelegram } from "hooks/useTelegram";
import { Category } from "shared/business/create-business-form/dto/categories.dto";
import {
	createBusiness,
	getBusiness,
	getCategories,
	updateBusiness,
} from "shared/business/create-business-form/services/data";

import { CreateBusiness } from "shared/business/create-business-form/types/create-business.interface";
import FormContact from "shared/business/create-business-form/form-contact";
import FormTitle from "shared/business/create-business-form/form-title";
import FormDescription from "shared/business/create-business-form/form-description";
import FormCategories from "shared/business/create-business-form/form-category";
import FormAddress from "shared/business/create-business-form/form-address";
import FormResult from "shared/business/create-business-form/form-result";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import { useLoaderData } from "react-router-dom";
import FormPreview from "shared/business/create-business-form/form-preview";
import { Business } from "shared/business/create-business-form/dto/business.dto";

export interface ILoader {
	categories: Category[];
	business?: Business;
	businessId?: string;
}

export async function loader({ params }: any): Promise<ILoader> {
	const categories = await getCategories();
	if (params.businessId) {
		const business = await getBusiness(`${params.businessId}`);
		const businessId = `${params.businessId}`;
		return { categories, business, businessId };
	}
	return { categories };
}

export interface SelectProps {
	label: string;
	value: string;
}

export function Component() {
	const { user } = useTelegram();
	const { categories, business, businessId } = useLoaderData() as ILoader;
	console.log(categories);
	const [data, setData] = useState<CreateBusiness>({
		title: business?.title ?? "",
		description: business?.description ?? "",
		categoryId: business?.category._id ?? "",
		address: business?.address ?? {
			isExist: false,
		},
		contacts: business?.contacts ?? [],
		preview: business?.preview._id ?? "",
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

	const onChangeCategory = (categoryId: string) => {
		setData((value) => {
			return { ...value, categoryId };
		});
	};

	const dataCategory: SelectProps[] = useMemo(
		() =>
			categories.map((category) => ({
				label: category.title,
				value: category._id,
			})),
		[categories]
	);
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
			value={data.preview}
		/>,
		<FormCategories
			dataCategory={dataCategory}
			currentStep={currentStep}
			value={data.categoryId}
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
