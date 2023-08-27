import React, { useEffect, useState } from "react";
import { Button, message, Upload } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { useTelegram } from "hooks/useTelegram";
import styles from "shared/business/create-business-form/business-form.module.css";
import { CreateBusiness } from "shared/business/create-business-form/types/create-business.interface";
import {
	getImage,
	uploadPhoto,
} from "shared/business/create-business-form/services/data";
import ContentLayout from "shared/components/content-layout";
import StepCounter from "shared/components/step-counter";

export interface FromPreviewProps {
	currentStep: number;
	maxSteps: number;
	onChange: React.Dispatch<React.SetStateAction<CreateBusiness>>;
	value?: string;
	isEmptyCallback: (value: boolean) => void;
}

const FormPreview = ({
	currentStep,
	maxSteps,
	onChange,
	value,
	isEmptyCallback,
}: FromPreviewProps) => {
	const { user } = useTelegram();

	const [defaultList, setDefaultList] = useState<UploadFile[]>([]);
	const allowedImageFormats = ["image/jpeg", "image/png"];
	const handleOnRemove = () => {
		onChange((prevData: any) => ({
			...prevData,
			preview: undefined,
		}));
	};

	const onChangeUpload = (info: UploadChangeParam) => {
		if (info.file.status === "uploading") {
			setDefaultList([
				{
					uid: info.file.uid, // or use some unique identifier
					name: info.file.fileName || "uploading",
					status: "uploading",
					url: `loading`,
				},
			]);
		}
		if (info.file.status === "done") {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	};

	const customRequest = async ({ file, onSuccess, onError }: any) => {
		try {
			if (!allowedImageFormats.includes(file.type)) {
				message.error(`${file.name} файл не является картинкой.`);
				return;
			}
			const formData = new FormData();
			formData.append("file", file);
			formData.append("userId", user?.id);
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

	useEffect(() => {
		isEmptyCallback(false);
	}, [isEmptyCallback, value]);

	return (
		<ContentLayout
			headerPrimary={"Загрузите логотип вашего бизнеса:"}
			headerSecondary={
				<StepCounter currentStep={currentStep} maxSteps={maxSteps} />
			}
		>
			<div className={styles.uploadInput}>
				<Upload
					fileList={defaultList}
					showUploadList={{
						showRemoveIcon: true,
						removeIcon: <DeleteOutlined className={styles.icon} />,
					}}
					onChange={onChangeUpload}
					customRequest={customRequest}
					onRemove={handleOnRemove}
					maxCount={1}
					listType={"picture"}
				>
					<Button icon={<UploadOutlined />}>Click to Upload</Button>
				</Upload>
			</div>
		</ContentLayout>
	);
};

export default FormPreview;
