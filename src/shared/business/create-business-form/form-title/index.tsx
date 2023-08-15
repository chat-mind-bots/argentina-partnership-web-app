import React, { useEffect } from "react";
import styles from "shared/business/create-business-form/business-form.module.css";
import InputText from "shared/components/input/input-text";

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
	}, [value]);
	return (
		<div>
			<div className={styles.headerWrapper}>
				<h2>Введите название бизнеса:</h2>
				<div className={styles.stepper}>
					{`${currentStep + 1} / ${maxSteps}`}
				</div>
			</div>
			<InputText
				className={styles.formInput}
				type={"standard"}
				value={value}
				placeholder={"Название"}
				onChange={handleOnChange}
			/>
			<div className={styles.stepDescription}>
				<div className={styles.stepDescriptionTitle}>Пример:</div>
				<div>Додо пицца</div>
			</div>
		</div>
	);
};

export default FormTitle;
