import React, { useState } from "react";
import styles from "shared/business/create-business-form/business-form.module.css";
import { Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { FormData } from "shared/business/create-business-form/form-contact/index";
import { IContacts } from "shared/business/create-business-form/types/create-business.interface";
import Modal from "antd/es/modal/Modal";

interface IContactsProps {
	values: Array<IContacts>;
	contactData: { [key: string]: FormData };
	onSelectAddMenu: () => void;
}

const Contacts = ({ values, contactData, onSelectAddMenu }: IContactsProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<div className={styles.contactsWrapper}>
			{values.map((value, index) => {
				return (
					<div
						key={`raw-contact--${value.value}-${index}`}
						className={styles.contactLine}
					>
						<div className={styles.contactHeader}>
							<div>{index + 1}.</div>
							<div>{value.value}</div>
							<div className={styles.contactType}>
								{contactData[value.type].title}
							</div>
						</div>
						<Button
							type={"primary"}
							className={styles.contactSettingsButton}
							onClick={showModal}
						>
							<SettingOutlined />
						</Button>
						<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
							<p>Some contents...</p>
							<p>Some contents...</p>
							<p>Some contents...</p>
						</Modal>
					</div>
				);
			})}
			<Button onClick={onSelectAddMenu}>Добавить</Button>
		</div>
	);
};

export default Contacts;
