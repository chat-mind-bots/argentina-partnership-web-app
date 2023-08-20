import React from "react";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload/interface";
import axios from "axios";
import { useTelegram } from "hooks/useTelegram";
import styles from "shared/business/create-business-form/business-form.module.css";
import { CreateBusiness } from "shared/business/create-business-form/types/create-business.interface";
import { uploadPhoto } from "shared/business/create-business-form/services/data";

export interface FromPreviewProps {
	currentStep: number;
	maxSteps: number;
	onChange: React.Dispatch<React.SetStateAction<CreateBusiness>>;
}

const FormPreview = ({ currentStep, maxSteps, onChange }: FromPreviewProps) => {
	const { user } = useTelegram();
	const handleOnChange = (info: UploadChangeParam) => {
		if (info.file.status === "done") {
			message.success(
				`${info.file.name} ваша фотография была успешно загружена.`
			);
			onChange((prevData: any) => ({
				...prevData,
				preview: info.file.response.file._id,
			}));
		} else if (info.file.status === "error") {
			message.error(`${info.file.name} что-то пошло не так.`);
		}
	};

	const customRequest = async ({ file, onSuccess, onError }: any) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("userId", `250101824`);
		const xhr = new XMLHttpRequest();

		xhr.open("POST", `http://localhost:3000/file/image`);
		xhr.send(formData);
		xhr.response;
		// const response = await uploadPhoto(formData);
		// if (response) {
		// 	onSuccess(response, file);
		// } else {
		// 	onError("Upload failed");
		// }
	};

	return (
		<div>
			<div className={styles.headerWrapper}>
				<h2>Загрузите фотографию вашего бизнеса:</h2>
				<div className={styles.stepper}>
					{`${currentStep + 1} / ${maxSteps}`}
				</div>
			</div>
			<Upload
				onChange={handleOnChange}
				customRequest={customRequest}
				maxCount={1}
				listType={"picture"}
			>
				<Button icon={<UploadOutlined />}>Click to Upload</Button>
			</Upload>
		</div>
	);
};

export default FormPreview;
