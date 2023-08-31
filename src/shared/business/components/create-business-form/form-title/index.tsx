import React, { useEffect } from "react";
import InputText from "shared/components/input/input-text";
import ContentLayout from "shared/components/content-layout";
import StepCounter from "shared/components/step-counter";
import Description from "shared/components/description";

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
					<Description primary={"Пример:"} secondary={"Додо пицца"} />
				}
			/>
		</ContentLayout>
	);
};

export default FormTitle;
