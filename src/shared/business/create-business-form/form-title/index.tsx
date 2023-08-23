import React, { useEffect } from "react";
import styles from "shared/business/create-business-form/business-form.module.css";
import InputText from "shared/components/input/input-text";
import ContentLayout from "shared/components/content-layout";
import StepCounter from "shared/components/step-counter";

interface FormTitleProps {
	onChange: React.Dispatch<React.SetStateAction<any>>;
	currentStep: number;
	maxSteps: number;
	value: string;
	isEmptyCallback: (value: boolean) => void;
}

const FormTitle = ({
	currentStep,
	maxSteps,
	value,
	onChange,
	isEmptyCallback,
}: FormTitleProps) => {
	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange((prevData: any) => ({
			...prevData,
			title: event.target.value,
		}));
	};

	useEffect(() => {
		isEmptyCallback(!value);
	}, [isEmptyCallback, value]);

	return (
		<ContentLayout
			headerPrimary={"Введите название бизнеса:"}
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
					<div className={styles.stepDescription}>
						<div className={styles.stepDescriptionTitle}>Пример:</div>
						<div>Додо пицца</div>
					</div>
				}
			/>
		</ContentLayout>
	);
};

export default FormTitle;
