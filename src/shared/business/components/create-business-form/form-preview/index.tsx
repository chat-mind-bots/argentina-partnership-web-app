import React, { useEffect } from "react";
import { CreateBusiness } from "shared/business/interfaces/create-business.interface";
import ContentLayout from "shared/components/content-layout";
import StepCounter from "shared/components/step-counter";
import UploadPhoto from "shared/components/upload-photo";

export interface FromPreviewProps {
	currentStep: number;
	maxSteps: number;
	onChange: React.Dispatch<React.SetStateAction<CreateBusiness>>;
	value?: string;
	mainButtonCallback: (text: string) => void;
	isEmptyCallback: (value: boolean) => void;
}

const FormPreview = ({
	currentStep,
	maxSteps,
	mainButtonCallback,
	onChange,
	value,
	isEmptyCallback,
}: FromPreviewProps) => {
	const handleChange = (fileId?: string) => {
		onChange((prev: CreateBusiness) => ({
			...prev,
			preview: fileId,
		}));
	};

	useEffect(() => {
		isEmptyCallback(false);
	}, [isEmptyCallback, value]);

	useEffect(() => {
		mainButtonCallback("Далее");

		!value ? mainButtonCallback("Пропустить") : mainButtonCallback("Далее");
	}, [value]);

	return (
		<ContentLayout
			headerPrimary={"Загрузите логотип вашего бизнеса:"}
			headerSecondary={
				<StepCounter currentStep={currentStep} maxSteps={maxSteps} />
			}
		>
			<UploadPhoto onChange={handleChange} defaultImage={value} />
		</ContentLayout>
	);
};

export default FormPreview;
