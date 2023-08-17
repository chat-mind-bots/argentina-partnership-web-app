import React, { useEffect, useState } from "react";
import { Button } from "antd";
import styles from "./slider.module.css";
import { useTelegram } from "hooks/useTelegram";

interface SliderProps {
	steps: React.ReactNode[];
	setActiveStep: (cb: (value: number) => number) => void;
	activeStep: number;
	hideButtons: boolean;
	onSendData?: () => void;
	isNextButtonDisabled?: boolean;
	finishButtonText?: string;
	children?: React.ReactNode;
}

const Slider = ({
	steps,
	finishButtonText,
	isNextButtonDisabled,
	onSendData,
	activeStep,
	hideButtons,
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

	return (
		<div>
			{steps.map((step, index) => {
				if (activeStep === index) {
					return <div key={`active--step${index}`}>{step}</div>;
				}
			})}
			{activeStep !== steps.length ? (
				<div className={styles.wrapper}>
					{!hideButtons && (
						<Button
							type={"primary"}
							onClick={handleBack}
							className={styles.primaryButton}
							disabled={activeStep === 0}
						>
							Назад
						</Button>
					)}
					{activeStep !== steps.length - 1 ? (
						<div style={{ width: "100%" }}>
							{!hideButtons && (
								<Button
									type={"primary"}
									onClick={handleNext}
									className={styles.primaryButton}
									disabled={isNextButtonDisabled}
								>
									Далее
								</Button>
							)}
						</div>
					) : (
						<div style={{ width: "100%" }}>
							{!hideButtons && (
								<Button
									type={"primary"}
									onClick={async () => {
										await enterLoading();
									}}
									className={styles.primaryButton}
									disabled={isNextButtonDisabled}
									loading={loading}
								>
									{finishButtonText}
								</Button>
							)}
						</div>
					)}
				</div>
			) : (
				children
			)}
		</div>
	);
};

export default Slider;
