import React, { FC, useEffect, useState } from "react";
import styles from "./upload-photo.module.less";
import { Button, message, Upload } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { getImage, uploadPhoto } from "shared/business/data";
import { useTelegram } from "hooks/useTelegram";

const allowedImageFormats = ["image/jpeg", "image/png"];

interface IOwnProps {
	defaultImage?: string;
	onChange(fileId?: string): void;
}
const UploadPhoto: FC<IOwnProps> = ({ defaultImage, onChange }) => {
	const { user } = useTelegram();
	const [defaultList, setDefaultList] = useState<UploadFile[]>([]);

	useEffect(() => {
		async function fetchData() {
			if (defaultImage) {
				const imageData = await getImage(defaultImage);
				console.log(imageData);
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
	}, [defaultImage]);

	const handleOnRemove = () => {
		onChange();
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
			console.log("file", response);
			if (response) {
				onSuccess(response, file);
				onChange(response.file._id);
			} else {
				onError("Upload failed");
			}
		} catch (error) {
			onError("Upload failed");
		}
	};

	return (
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
	);
};

export default UploadPhoto;
