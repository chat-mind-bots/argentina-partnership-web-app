import React, { useEffect, useMemo, useState, lazy, Suspense } from "react";
import Slider from "shared/components/slider";
import styles from "shared/business/components/create-business-form/business-form.module.less";
import { useTelegram } from "hooks/useTelegram";
import { Category } from "shared/business/dto/categories.dto";
import {
	createBusiness,
	getBusiness,
	getCategories,
	updateBusiness,
} from "shared/business/data";

import { CreateBusiness } from "shared/business/interfaces/create-business.interface";
import FormResult from "shared/business/components/create-business-form/form-result";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";
import { Business, StatusEnum } from "shared/business/dto/business.dto";
import PageLoader from "shared/components/page-loader";

const FormContact = lazy(
	() => import("shared/business/components/create-business-form/form-contact")
);

const FormTitle = lazy(
	() => import("shared/business/components/create-business-form/form-title")
);

const FormDescription = lazy(
	() =>
		import("shared/business/components/create-business-form/form-description")
);

const FormCategories = lazy(
	() => import("shared/business/components/create-business-form/form-category")
);

const FormAddress = lazy(
	() => import("shared/business/components/create-business-form/form-address")
);

const FormPreview = lazy(
	() => import("shared/business/components/create-business-form/form-preview")
);

export interface ILoader {
	categories: Category[];
	business?: Business;
	businessId?: string;
}

export async function loader({
	params: { businessId },
}: {
	params: { businessId?: string };
}) {
	const categoriesDataPromise = getCategories();
	if (businessId) {
		const businessDataPromise = getBusiness(`${businessId}`);
		const data = Promise.all([
			categoriesDataPromise,
			businessDataPromise,
			businessId,
		]);
		return defer({
			data,
		});
	}
	return defer({ data: Promise.all([categoriesDataPromise]) });
}

export interface SelectProps {
	label: string;
	value: string;
}

function CreateBusinessForm() {
	const { user } = useTelegram();
	const [categories, business, businessId] = useAsyncValue() as [
		Category[],
		Business | undefined,
		string | undefined,
	];
	const [data, setData] = useState<CreateBusiness>({
		title: business?.title ?? "",
		description: business?.description ?? "",
		categoryId: business?.category._id ?? "",
		address: business?.address ?? {
			isExist: false,
		},
		status: business?.status ?? StatusEnum.ACTIVE,
		contacts: business?.contacts ?? [],
		preview: business?.preview?._id ?? undefined,
		avgCheck: business?.avgCheck ?? 0,
	});
	const [mainButtonText, setMainButtonText] = useState("Далее");
	const [isEmpty, setIsEmpty] = useState(false);
	const [hideButtons, setHideButtons] = useState(false);
	const [isValidLink, setIsValidLinkLink] = useState(true);
	const handleMainButtonText = (text: string) => {
		setMainButtonText(text);
	};
	const handleOnSend = async () => {
		const sendData: CreateBusiness = {
			...data,
			address: data.address.isExist
				? {
						...data.address,
				  }
				: {
						isExist: data.address.isExist,
				  },
		};
		if (businessId) {
			return updateBusiness(user?.id, businessId, sendData);
		}
		return createBusiness(user?.id, sendData);
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

	const steps = [
		<Suspense fallback={<PageLoader />}>
			<FormTitle
				currentStep={currentStep}
				value={data.title}
				mainButtonCallback={setMainButtonText}
				onChange={setData}
				isEmptyCallback={setIsEmpty}
				maxSteps={maxSteps}
			/>
		</Suspense>,
		<Suspense fallback={<PageLoader />}>
			<FormDescription
				currentStep={currentStep}
				value={data.description}
				mainButtonCallback={setMainButtonText}
				onChange={setData}
				isEmptyCallback={setIsEmpty}
				maxSteps={maxSteps}
			/>
		</Suspense>,
		<Suspense fallback={<PageLoader />}>
			<FormPreview
				currentStep={currentStep}
				maxSteps={maxSteps}
				mainButtonCallback={setMainButtonText}
				isEmptyCallback={setIsEmpty}
				onChange={setData}
				value={data.preview}
			/>
		</Suspense>,
		<Suspense fallback={<PageLoader />}>
			<FormCategories
				dataCategory={dataCategory}
				currentStep={currentStep}
				value={data.categoryId}
				mainButtonCallback={setMainButtonText}
				onChange={onChangeCategory}
				isEmptyCallback={setIsEmpty}
				maxSteps={maxSteps}
			/>
		</Suspense>,
		<Suspense fallback={<PageLoader />}>
			<FormContact
				maxSteps={maxSteps}
				currentStep={currentStep}
				isEmptyCallback={setIsEmpty}
				mainButtonCallback={setMainButtonText}
				values={data.contacts}
				hideButtonsCallback={setHideButtons}
				setData={setData}
			/>
		</Suspense>,
		<Suspense fallback={<PageLoader />}>
			<FormAddress
				value={data.address}
				isValidLink={isValidLink}
				maxSteps={maxSteps}
				setValidLink={setIsValidLinkLink}
				mainButtonCallback={setMainButtonText}
				setData={setData}
				isEmptyCallback={setIsEmpty}
				currentStep={currentStep}
			/>
		</Suspense>,
		// <Suspense>
		// 	<FormAvgCheck
		// 		value={data.avgCheck}
		// 		maxSteps={maxSteps}
		// 		currentStep={currentStep}
		// 		mainButtonCallback={setMainButtonText}
		// 		isEmptyCallback={setIsEmpty}
		// 		setData={setData}
		// 	/>
		// </Suspense>,
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
					mainButtonText={mainButtonText}
					isNextButtonDisabled={isEmpty}
					onSendData={handleOnSend}
				>
					<FormResult mode={businessId ? "update" : "create"} />
				</Slider>
			</div>
		</WebAppProvider>
	);
}

export function Component() {
	const data = useLoaderData() as {
		data: [Category[], Business | undefined, string | undefined];
	};
	return (
		<Await resolve={data.data}>
			<CreateBusinessForm />
		</Await>
	);
}
