import React, { useEffect } from "react";
import InputText from "shared/components/input/input-text";
import ContentLayout from "shared/components/content-layout";
import StepCounter from "shared/components/step-counter";
import Description from "shared/components/description";

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
	const handleOnChange = (text: string) => {
		onChange((prevData: any) => ({
			...prevData,
			description: text,
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
					<Description
						primary={"Пример:"}
						secondary={
							"Пицца от 289 рублей. Быстрая бесплатная доставка домой и в офис.\n" +
							"\t\t\t\t\t\t\tПоказываем в прямом эфире, как готовим вашу пиццу."
						}
					/>
				}
			/>
		</ContentLayout>
	);
};

export default FormDescription;
