import React, { useEffect } from "react";
import StepCounter from "shared/components/step-counter";
import ContentLayout from "shared/components/content-layout";
import { CreateBusiness } from "shared/business/create-business-form/types/create-business.interface";
import styles from "shared/business/create-business-form/business-form.module.css";
import { Radio, RadioChangeEvent, Space } from "antd";
import { AvgCheckEnum } from "shared/business/create-business-form/types/avg-check.type";
import Description from "shared/components/description";

interface FormAvgCheckProps {
	currentStep: number;
	maxSteps: number;
	value: number;
	setData: React.Dispatch<React.SetStateAction<CreateBusiness>>;
	isEmptyCallback: (value: boolean) => void;
}

const FormAvgCheck = ({
	currentStep,
	maxSteps,
	value,
	isEmptyCallback,
	setData,
}: FormAvgCheckProps) => {
	const handleOnClick = (event: RadioChangeEvent) => {
		setData((prev: CreateBusiness) => {
			return {
				...prev,
				avgCheck: +event.target.value,
			};
		});
	};

	useEffect(() => {
		isEmptyCallback(false);
	}, []);

	return (
		<div>
			<ContentLayout
				headerPrimary={"Укажите средний чек:"}
				headerSecondary={
					<StepCounter currentStep={currentStep} maxSteps={maxSteps} />
				}
			>
				<div className={styles.formInnerWrapper}>
					<Radio.Group value={value} onChange={handleOnClick}>
						<Space direction={"vertical"} className={styles.formRadioGroup}>
							<Radio value={AvgCheckEnum.LOW}>до 5$</Radio>
							<Radio value={AvgCheckEnum.MIDDLE}>от 5$ до 10$</Radio>
							<Radio value={AvgCheckEnum.HIGH}>от 10$ и выше</Radio>
						</Space>
					</Radio.Group>
				</div>
				<Description primary={"Примерное значение"} />
			</ContentLayout>
		</div>
	);
};

export default FormAvgCheck;
