import styles from "shared/business/create-business-form/business-form.module.css";
import Select, { SelectOption } from "shared/components/select";
import React, { useEffect } from "react";

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
	}, [value]);
	return (
		<div>
			<div className={styles.headerWrapper}>
				<h2>Выберете категорию бизнеса:</h2>
				<div className={styles.stepper}>{`${
					currentStep + 1
				} / ${maxSteps}`}</div>
			</div>
			<div>
				<Select
					showSearch
					value={value}
					placeholder="Выберете категорию"
					onChange={onChange}
					options={dataCategory}
				/>
			</div>
		</div>
	);
};

export default FormCategories;
