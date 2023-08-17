import React, { useEffect, useState } from "react";
import { Button } from "antd";
import styles from "./slider.module.css";
import { useTelegram } from "hooks/useTelegram";
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
	isValidLink: boolean;
}

const Slider = ({
	steps,
	finishButtonText,
	isNextButtonDisabled,
	onSendData,
	activeStep,
	hideButtons,
	isValidLink,
	children,
	setActiveStep,
}: SliderProps) => {
	const { tg } = useTelegram();

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

	useEffect(() => {
		tg.onEvent("mainButtonClicked", onSendData);
		return () => {
			tg.offEvent("mainButtonClicked", onSendData);
		};
	}, [onSendData]);

	const isLasStep = activeStep === steps.length - 1;
	return (
		<div>
			{steps.map((step, index) => {
				if (activeStep === index) {
					return <div key={`active--step${index}`}>{step}</div>;
				}
			})}
			{activeStep !== steps.length ? (
				<div className={styles.wrapper}>
					{!hideButtons && !(activeStep === 0 || !isValidLink) && (
						<BackButton onClick={handleBack} />
					)}
					<MainButton
						onClick={isLasStep ? async () => await enterLoading() : handleNext}
						disabled={isNextButtonDisabled || !isValidLink}
						text={isLasStep ? finishButtonText : "Далее"}
						progress={isLasStep ? loading : false}
					/>
				</div>
			) : (
				children
			)}
		</div>
	);
};

export default Slider;
