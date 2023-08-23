import React, { useEffect } from "react";
import styles from "shared/business/create-business-form/business-form.module.css";
import InputText from "shared/components/input/input-text";
import ContentLayout from "shared/components/content-layout";
import StepCounter from "shared/components/step-counter";

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
	}, [isEmptyCallback, value]);

	return (
		<ContentLayout
			headerPrimary={"Введите описание бизнеса:"}
			headerSecondary={
				<StepCounter currentStep={currentStep} maxSteps={maxSteps} />
			}
		>
			<InputText
				type={"standard"}
				value={value}
				placeholder={"Описание"}
				onChange={handleOnChange}
				isTextArea={true}
				description={
					<div className={styles.stepDescription}>
						<div className={styles.stepDescriptionTitle}>Пример:</div>
						<div>
							Пицца от 289 рублей. Быстрая бесплатная доставка домой и в офис.
							Показываем в прямом эфире, как готовим вашу пиццу.
						</div>
					</div>
				}
			/>
		</ContentLayout>
	);
};

export default FormDescription;
