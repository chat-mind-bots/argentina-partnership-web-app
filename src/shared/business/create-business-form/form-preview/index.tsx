import React from "react";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload/interface";
import axios from "axios";
import { useTelegram } from "hooks/useTelegram";
import styles from "shared/business/create-business-form/business-form.module.css";
import { CreateBusiness } from "shared/business/create-business-form/types/create-business.interface";

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
				preview: info.file.response.url,
			}));
		} else if (info.file.status === "error") {
			message.error(`${info.file.name} что-то пошло не так.`);
		}
	};

	const customRequest = async ({ file, onSuccess, onError }: any) => {
		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("userId", user?.id);
			const response = await axios.post(
				`${process.env.BASE_URL}/api/file/image`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			// Handle the response
			if (response.data) {
				onSuccess(response.data, file);
				console.log(response);
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
