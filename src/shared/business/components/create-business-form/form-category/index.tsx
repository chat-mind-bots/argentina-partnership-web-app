import Select, { SelectOption } from "shared/components/select";
import React, { useEffect } from "react";
import ContentLayout from "shared/components/content-layout";
import StepCounter from "shared/components/step-counter";

export interface FormCategoriesProps {
	currentStep: number;
	maxSteps: number;
	onChange: React.Dispatch<React.SetStateAction<any>>;
	value: string;
	isEmptyCallback: (value: boolean) => void;
	dataCategory: SelectOption[];
}

const FormCategories = ({
	currentStep,
	maxSteps,
	dataCategory,
	value,
	onChange,
	isEmptyCallback,
}: FormCategoriesProps) => {
	useEffect(() => {
		isEmptyCallback(!value);
	}, [isEmptyCallback, value]);

	return (
		<ContentLayout
			headerPrimary={"Выберете категорию бизнеса:"}
			headerSecondary={
				<StepCounter currentStep={currentStep} maxSteps={maxSteps} />
			}
		>
			<Select
				showSearch
				value={value}
				placeholder="Выберете категорию"
				onChange={onChange}
				options={dataCategory}
			/>
		</ContentLayout>
	);
};

export default FormCategories;
