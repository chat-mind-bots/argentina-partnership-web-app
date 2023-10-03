import React, { useState } from "react";
import styles from "./slider.module.css";
import { BackButton, MainButton } from "@vkruglikov/react-telegram-web-app";

interface SliderProps {
	steps: React.ReactNode[];
	setActiveStep: (cb: (value: number) => number) => void;
	activeStep: number;
	hideButtons: boolean;
	onSendData?: () => void;
	isNextButtonDisabled?: boolean;
	finishButtonText?: string;
	children?: React.ReactNode;
	mainButtonText: string;
	isValidLink: boolean;
}

const Slider = ({
	steps,
	isNextButtonDisabled,
	activeStep,
	onSendData,
	hideButtons,
	isValidLink,
	mainButtonText,
	children,
	setActiveStep,
}: SliderProps) => {
	const [loading, setLoading] = useState(false);

	const enterLoading = async () => {
		setLoading(true);
		try {
			const data = await onSendData?.call(this);
			handleNext();
		} catch (error) {}
	};

	const handleNext = () => {
		setActiveStep((prevState) => prevState + 1);
	};
	const handleBack = () => {
		setActiveStep((prevState) => prevState - 1);
	};

	const isLasStep = activeStep === steps.length - 1;
	return (
		<div>
			{steps.map((step, index) => {
				if (activeStep === index) {
					return <div key={`active--step${index}`}>{step}</div>;
				}
				return <></>;
			})}
			{activeStep !== steps.length ? (
				<div className={styles.wrapper}>
					{!hideButtons && !(activeStep === 0 || !isValidLink) && (
						<>
							<BackButton onClick={handleBack} />
						</>
					)}
					{!hideButtons && (
						<MainButton
							onClick={
								isLasStep ? async () => await enterLoading() : handleNext
							}
							disabled={isNextButtonDisabled || !isValidLink}
							text={mainButtonText}
							progress={isLasStep ? loading : false}
						/>
					)}
				</div>
			) : (
				children
			)}
		</div>
	);
};

export default Slider;
