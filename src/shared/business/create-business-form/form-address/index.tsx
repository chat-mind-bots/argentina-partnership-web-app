import React, { useEffect } from "react";
import styles from "shared/business/create-business-form/business-form.module.css";
import InputText from "shared/components/input/input-text";
import { IAddress } from "shared/business/create-business-form/types/address.interface";
import { Checkbox, Input } from "antd";
import { CreateBusiness } from "shared/business/create-business-form/types/create-business.interface";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import StepCounter from "shared/components/step-counter";
import ContentLayout from "shared/components/content-layout";

interface FormTitleProps {
	currentStep: number;
	maxSteps: number;
	value: IAddress;
	setData: React.Dispatch<React.SetStateAction<CreateBusiness>>;
	isEmptyCallback: (value: boolean) => void;
	setValidLink: React.Dispatch<React.SetStateAction<boolean>>;
	isValidLink: boolean;
}

const FormAddress = ({
	currentStep,
	maxSteps,
	value,
	isEmptyCallback,
	setData,
	setValidLink,
	isValidLink,
}: FormTitleProps) => {
	const handleValidateGoogleLink = (link: string) => {
		if (link === "") {
			return setValidLink(true);
		}
		const pattern = /^https:\/\/goo\.gl\/maps\/[a-zA-Z0-9]+$/;
		setValidLink(pattern.test(link));
	};
	const handleOnChange = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>,
		filedName: string
	) => {
		setData((prev) => {
			return {
				...prev,
				address: {
					...prev.address,
					[filedName]: event.target.value,
				},
			};
		});
	};
	const handleOnCheckboxChange = (event: CheckboxChangeEvent) => {
		setData((prev) => {
			return {
				...prev,
				address: {
					...prev.address,
					isExist: event.target.checked,
				},
			};
		});
	};

	useEffect(() => {
		if (value.isExist) isEmptyCallback(!value.addressLine);
		if (!value.isExist) isEmptyCallback(false);
	}, [value.isExist, value.addressLine, isEmptyCallback]);

	return (
		<div>
			<ContentLayout
				headerPrimary={"Ваш адрес:"}
				headerSecondary={
					<StepCounter currentStep={currentStep} maxSteps={maxSteps} />
				}
			>
				<div className={styles.formInnerWrapper}>
					<Checkbox
						onChange={handleOnCheckboxChange}
						className={styles.addressLabel}
						checked={value.isExist}
					>
						У вашего бизнеса есть адрес?
					</Checkbox>
				</div>
				{value.isExist && (
					<div className={styles.formWrapper}>
						<div>
							<div className={styles.formInnerWrapper}>
								<div>Введите адрес:</div>
							</div>
							<InputText
								className={styles.formInput}
								type={"standard"}
								value={value.addressLine || ""}
								placeholder={"Адрес"}
								onChange={(event) => handleOnChange(event, "addressLine")}
							/>
							<div className={styles.stepDescription}>
								<div className={styles.stepDescriptionTitle}>
									Пример адреса:
								</div>
								<div>Cerrito 628, C1010AAN CABA</div>
							</div>
						</div>
						<div>
							<div className={styles.formInnerWrapper}>
								Введите ссылку на гугл карты с геолокацией (необязательно):
							</div>
							<InputText
								className={styles.formInput}
								type={"standard"}
								value={value.googleMapsLink || ""}
								placeholder={"Ссылка на геолокацию"}
								onChange={(event) => {
									handleValidateGoogleLink(event.target.value);
									handleOnChange(event, "googleMapsLink");
								}}
							/>
							{!isValidLink && (
								<div className={styles.error}>**Неправильно указана ссылка</div>
							)}
							<div className={styles.stepDescription}>
								<div className={styles.stepDescriptionTitle}>
									Пример ссылки:
								</div>
								<div>https://goo.gl/maps/uRJab2dZWwXDqSNs8</div>
							</div>
						</div>
						<div>
							<div className={styles.formInnerWrapper}>
								Опишите как добраться до вас (необязательно):
							</div>
							<Input.TextArea
								className={styles.formInput}
								value={value.comment || ""}
								placeholder={"Введите описание"}
								onChange={(event) => handleOnChange(event, "comment")}
							/>
							<div className={styles.stepDescription}>
								<div className={styles.stepDescriptionTitle}>
									Пример описания:
								</div>
								<div>
									Пройдя по Cerrito, вы заметите характерные архитектурные
									детали и стильное оформление кафе. Окна заведения украшены
									витражами в тематике танго, а фасад украшен яркой мозаикой,
									напоминающей о богатой культурной истории страны.
								</div>
							</div>
						</div>
					</div>
				)}
			</ContentLayout>
		</div>
	);
};

export default FormAddress;
