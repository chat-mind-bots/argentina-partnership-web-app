import React from "react";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload/interface";
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
	const allowedImageFormats = ["image/jpeg", "image/png"];
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
		try {
			if (!allowedImageFormats.includes(file.type)) {
				onError(
					"Invalid file format. Please upload an image (JPEG, PNG, GIF)."
				);
				return;
			}
			const formData = new FormData();
			formData.append("file", file);
			formData.append("userId", `${user?.id}`);
			const response = await uploadPhoto(formData);
			if (response) {
				onSuccess(response, file);
			} else {
				onError("Upload failed");
			}
		} catch (error) {
			onError("Upload failed");
		}
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
