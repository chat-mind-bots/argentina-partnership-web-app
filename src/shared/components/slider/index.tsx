import React, { useEffect } from "react";
import { Button } from "antd";
import styles from "./slider.module.css";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useTelegram } from "hooks/useTelegram";

interface SliderProps {
	steps: React.ReactElement[];
	onSendData?: () => void;
	isNextButtonDisabled?: boolean;
	finishButtonText?: string;
}

const Slider = ({
	steps,
	finishButtonText,
	isNextButtonDisabled,
	onSendData,
}: SliderProps) => {
	const [activeStep, setActiveStep] = React.useState(0);
	const handleNext = () => {
		setActiveStep((prevState) => prevState + 1);
	};
	const { tg } = useTelegram();
	const handleBack = () => {
		setActiveStep((prevState) => prevState - 1);
	};

	useEffect(() => {
		tg.onEvent("mainButtonClicked", onSendData);
		return () => {
			tg.offEvent("mainButtonClicked", onSendData);
		};
	}, [onSendData]);

	return (
		<div>
			{steps.map((Step, index) => {
				if (activeStep === index) {
					return <div key={`active--step${index}`}>{Step}</div>;
				}
			})}
			{activeStep !== steps.length ? (
				<div className={styles.wrapper}>
					<Button
						type={"primary"}
						onClick={handleBack}
						className={styles.primaryButton}
						disabled={activeStep === 0}
					>
						Назад
					</Button>
					<Button
						type={"primary"}
						onClick={handleNext}
						className={styles.primaryButton}
						disabled={isNextButtonDisabled}
					>
						{activeStep !== steps.length - 1 ? finishButtonText : "Закончить"}
					</Button>
				</div>
			) : (
				<div>All steps completed - you&apos;re finished</div>
			)}
		</div>
	);
};

export default Slider;
