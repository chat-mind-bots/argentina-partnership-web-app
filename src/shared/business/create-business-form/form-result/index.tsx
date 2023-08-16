import React from "react";
import Emotion from "shared/components/emotion";
import styles from "../business-form.module.css";

const FormResult = () => {
	return (
		<div className={styles.resultWrapper}>
			<Emotion />
			<div>Ваш бизнес был успешно создан</div>
		</div>
	);
};

export default FormResult;
