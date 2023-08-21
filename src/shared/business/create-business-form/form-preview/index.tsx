import React, { useEffect, useState } from "react";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { useTelegram } from "hooks/useTelegram";
import styles from "shared/business/create-business-form/business-form.module.css";
import { CreateBusiness } from "shared/business/create-business-form/types/create-business.interface";
import {
	getImage,
	uploadPhoto,
} from "shared/business/create-business-form/services/data";

export interface FromPreviewProps {
	currentStep: number;
	maxSteps: number;
	onChange: React.Dispatch<React.SetStateAction<CreateBusiness>>;
	value?: string;
}

const FormPreview = ({
	currentStep,
	maxSteps,
	onChange,
	value,
}: FromPreviewProps) => {
	const { user } = useTelegram();

	const [defaultList, setDefaultList] = useState<UploadFile[]>([]);
	const allowedImageFormats = ["image/jpeg", "image/png"];
	const handleOnRemove = () => {
		onChange((prevData: any) => ({
			...prevData,
			preview: "",
		}));
	};
	const customRequest = async ({ file, onSuccess, onError }: any) => {
		try {
			if (!allowedImageFormats.includes(file.type)) {
				message.error(`${file.name} файл не является картинкой.`);
				return;
			}
			const formData = new FormData();
			formData.append("file", file);
			formData.append("userId", `${user?.id}`);
			const response = await uploadPhoto(formData);
			if (response) {
				onSuccess(response, file);
				onChange((prevData: any) => ({
					...prevData,
					preview: response.file._id,
				}));
			} else {
				onError("Upload failed");
			}
		} catch (error) {
			onError("Upload failed");
		}
	};

	useEffect(() => {
		async function fetchData() {
			if (value) {
				const imageData = await getImage(value);
				setDefaultList([
					{
						uid: imageData._id, // or use some unique identifier
						name: imageData.key,
						status: "done",
						url: `https://${imageData.domain}/${imageData.bucket}/${imageData.key}`,
					},
				]);
			} else {
				setDefaultList([]);
			}
		}
		fetchData();
	}, [value]);

	return (
		<div>
			<div className={styles.headerWrapper}>
				<h2>Загрузите фотографию вашего бизнеса:</h2>
				<div className={styles.stepper}>
					{`${currentStep + 1} / ${maxSteps}`}
				</div>
			</div>
			<Upload
				fileList={defaultList}
				customRequest={customRequest}
				onRemove={handleOnRemove}
				maxCount={1}
				listType={"picture"}
			>
				<Button icon={<UploadOutlined />}>Click to Upload</Button>
			</Upload>
		</div>
	);
};

export default FormPreview;
