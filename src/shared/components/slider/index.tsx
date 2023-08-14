import React, { useEffect } from "react";
import { Button, Progress } from "antd";
import styles from "./slider.module.css";
import { useTelegram } from "hooks/useTelegram";

interface SliderProps {
	steps: React.ReactNode[];
	setActiveStep: (cb: (value: number) => number) => void;
	activeStep: number;
	onSendData?: () => void;
	isNextButtonDisabled?: boolean;
	finishButtonText?: string;
	finishText?: string;
}

const Slider = ({
	steps,
	finishButtonText,
	isNextButtonDisabled,
	onSendData,
	activeStep,
	finishText,
	setActiveStep,
}: SliderProps) => {
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
					{activeStep !== steps.length - 1 ? (
						<Button
							type={"primary"}
							onClick={handleNext}
							className={styles.primaryButton}
							disabled={isNextButtonDisabled}
						>
							Далее
						</Button>
					) : (
						<Button
							type={"primary"}
							onClick={() => {
								onSendData?.call(this);
								handleNext();
							}}
							className={styles.primaryButton}
							disabled={isNextButtonDisabled}
						>
							{finishButtonText}
						</Button>
					)}
				</div>
			) : (
				<div>{finishText}</div>
			)}
		</div>
	);
};

export default Slider;
