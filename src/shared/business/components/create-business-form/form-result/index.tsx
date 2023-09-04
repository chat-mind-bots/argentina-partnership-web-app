import React from "react";
import Emotion from "shared/components/emotion";
import styles from "../business-form.module.css";

export interface FormResultProps {
	mode: "update" | "create";
}

const FormResult = ({ mode }: FormResultProps) => {
	return (
		<div className={styles.resultWrapper}>
			<Emotion />
			{mode === "update" && <div>Ваш бизнес был успешно обновлен</div>}
			{mode === "create" && <div>Ваш бизнес был успешно создан</div>}
		</div>
	);
};

export default FormResult;
