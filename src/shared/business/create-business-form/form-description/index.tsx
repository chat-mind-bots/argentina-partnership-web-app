import React, { useEffect } from "react";
import styles from "shared/business/create-business-form/business-form.module.css";
import InputText from "shared/components/input/input-text";

interface FormDescriptionProps {
	currentStep: number;
	maxSteps: number;
	onChange: React.Dispatch<React.SetStateAction<any>>;
	value: string;
	isEmptyCallback: (value: boolean) => void;
}

const FormDescription = ({
	currentStep,
	maxSteps,
	value,
	onChange,
	isEmptyCallback,
}: FormDescriptionProps) => {
	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange((prevData: any) => ({
			...prevData,
			description: event.target.value,
		}));
	};
	useEffect(() => {
		isEmptyCallback(!value);
	}, [value]);
	return (
		<div>
			<div className={styles.headerWrapper}>
				<h2>Введите описание бизнеса:</h2>
				<div className={styles.stepper}>
					{`${currentStep + 1} / ${maxSteps}`}
				</div>
			</div>
			<InputText
				type={"standard"}
				className={styles.formInput}
				value={value}
				placeholder={"Описание"}
				onChange={handleOnChange}
			/>
			<div className={styles.stepDescription}>
				<div className={styles.stepDescriptionTitle}>Пример:</div>
				<div>
					Пицца от 289 рублей. Быстрая бесплатная доставка домой и в офис.
					Показываем в прямом эфире, как готовим вашу пиццу.
				</div>
			</div>
		</div>
	);
};

export default FormDescription;
