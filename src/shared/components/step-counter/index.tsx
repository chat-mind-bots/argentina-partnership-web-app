import React, { FC } from "react";
import styles from "./step-counter.module.less";

interface IOwnProps {
	currentStep: number;
	maxSteps: number;
}

const StepCounter: FC<IOwnProps> = ({ currentStep, maxSteps }) => {
	return (
		<div className={styles.stepper}>{`${currentStep + 1} / ${maxSteps}`}</div>
	);
};

export default StepCounter;
