import React, { useEffect } from "react";
import styles from "shared/business/components/create-business-form/business-form.module.less";
import InputText from "shared/components/input/input-text";
import { IAddress } from "shared/business/interfaces/address.interface";
import { Checkbox, Input } from "antd";
import { CreateBusiness } from "shared/business/interfaces/create-business.interface";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import StepCounter from "shared/components/step-counter";
import ContentLayout from "shared/components/content-layout";
import Description from "shared/components/description";

interface FormTitleProps {
	currentStep: number;
	maxSteps: number;
	value: IAddress;
	setData: React.Dispatch<React.SetStateAction<CreateBusiness>>;
	isEmptyCallback: (value: boolean) => void;
	setValidLink: React.Dispatch<React.SetStateAction<boolean>>;
	mainButtonCallback: (text: string) => void;
	isValidLink: boolean;
}

const FormAddress = ({
	currentStep,
	maxSteps,
	value,
	mainButtonCallback,
	isEmptyCallback,
	setData,
	setValidLink,
	isValidLink,
}: FormTitleProps) => {
	const handleValidateGoogleLink = (link: string) => {
		if (link === "") {
			return setValidLink(true);
		}
		const desktopPattern = /^https:\/\/goo\.gl\/maps\/[a-zA-Z0-9]+$/;
		const mobilePattern = /^https:\/\/maps\.app\.goo\.gl\/[a-zA-Z0-9]+$/;
		setValidLink(desktopPattern.test(link) || mobilePattern.test(link));
	};
	const handleOnChange = (text: string, filedName: string) => {
		setData((prev) => {
			return {
				...prev,
				address: {
					...prev.address,
					[filedName]: text,
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

	useEffect(() => {
		value.isExist
			? mainButtonCallback("Далее")
			: mainButtonCallback("Пропустить");
	}, [value.isExist]);

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
						<div className={styles.formElement}>
							<div className={styles.formInnerWrapper}>
								<div>
									Введите адрес:
									<span className={styles.requireField}>*</span>
								</div>
							</div>
							<InputText
								className={styles.formInput}
								type={"standard"}
								value={value.addressLine || ""}
								placeholder={"Адрес"}
								onChange={(text) => handleOnChange(text, "addressLine")}
							/>
							<Description
								primary={"Пример адреса:"}
								secondary={"Cerrito 628, C1010AAN CABA"}
							/>
						</div>
						<div className={styles.formElement}>
							<div className={styles.formInnerWrapper}>
								Введите ссылку на гугл карты с геолокацией (необязательно):
							</div>
							<InputText
								className={styles.formInput}
								type={"standard"}
								value={value.googleMapsLink || ""}
								placeholder={"Ссылка на геолокацию"}
								onChange={(text) => {
									handleValidateGoogleLink(text);
									handleOnChange(text, "googleMapsLink");
								}}
							/>
							{!isValidLink && (
								<div className={styles.error}>**Неправильно указана ссылка</div>
							)}
							<Description
								primary={"Пример ссылки:"}
								secondary={
									"https://goo.gl/maps/uRJab2dZWwXDqSNs8" +
									"\n" +
									"https://maps.app.goo.gl/rKkUebJYqFiNpP8J7"
								}
							/>
						</div>
						<div className={styles.formElement}>
							<div className={styles.formInnerWrapper}>
								Опишите как добраться до вас (необязательно):
							</div>
							<Input.TextArea
								className={styles.formInput}
								value={value.comment || ""}
								placeholder={"Введите описание"}
								onChange={(event) =>
									handleOnChange(event.target.value, "comment")
								}
							/>
							<Description
								primary={"Пример описания:"}
								secondary={
									"Пройдя по Cerrito, вы заметите характерные архитектурные\n" +
									"\t\t\t\t\t\t\t\t\tдетали и стильное оформление кафе. Окна заведения украшены\n" +
									"\t\t\t\t\t\t\t\t\tвитражами в тематике танго, а фасад украшен яркой мозаикой,\n" +
									"\t\t\t\t\t\t\t\t\tнапоминающей о богатой культурной истории страны."
								}
							/>
						</div>
					</div>
				)}
			</ContentLayout>
		</div>
	);
};

export default FormAddress;
