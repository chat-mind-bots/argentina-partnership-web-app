import React, { useEffect } from "react";
import InputText from "shared/components/input/input-text";
import ContentLayout from "shared/components/content-layout";
import StepCounter from "shared/components/step-counter";
import Description from "shared/components/description";

import styles from "../business-form.module.less";

interface FormTitleProps {
	onChange: React.Dispatch<React.SetStateAction<any>>;
	currentStep: number;
	maxSteps: number;
	value: string;
	isEmptyCallback: (value: boolean) => void;
	mainButtonCallback: (text: string) => void;
}

const FormTitle = ({
	currentStep,
	maxSteps,
	value,
	onChange,
	mainButtonCallback,
	isEmptyCallback,
}: FormTitleProps) => {
	const handleOnChange = (text: string) => {
		onChange((prevData: any) => ({
			...prevData,
			title: text,
		}));
	};

	useEffect(() => {
		isEmptyCallback(!value);
	}, [isEmptyCallback, value]);

	useEffect(() => {
		mainButtonCallback("Далее");
	}, []);

	return (
		<ContentLayout
			headerPrimary={
				<>
					Введите название бизнеса
					<span className={styles.requireField}>*</span>
				</>
			}
			headerSecondary={
				<StepCounter currentStep={currentStep} maxSteps={maxSteps} />
			}
		>
			<InputText
				type={"standard"}
				value={value}
				placeholder={"Название"}
				onChange={handleOnChange}
				description={
					<Description primary={"Пример:"} secondary={"Додо пицца"} />
				}
			/>
		</ContentLayout>
	);
};

export default FormTitle;
