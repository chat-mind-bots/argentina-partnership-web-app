import Select, { SelectOption } from "shared/components/select";
import React, { useEffect } from "react";
import ContentLayout from "shared/components/content-layout";
import StepCounter from "shared/components/step-counter";
import styles from "shared/business/components/create-business-form/business-form.module.less";

export interface FormCategoriesProps {
	currentStep: number;
	maxSteps: number;
	onChange: React.Dispatch<React.SetStateAction<any>>;
	value: string;
	isEmptyCallback: (value: boolean) => void;
	mainButtonCallback: (text: string) => void;
	dataCategory: SelectOption[];
}

const FormCategories = ({
	currentStep,
	maxSteps,
	dataCategory,
	value,
	onChange,
	mainButtonCallback,
	isEmptyCallback,
}: FormCategoriesProps) => {
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
					Выберете категорию бизнеса:
					<span className={styles.requireField}>*</span>
				</>
			}
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
