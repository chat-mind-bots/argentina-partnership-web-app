import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "shared/business/create-business-form/business-form.module.css";
import { Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import {
	FormData,
	FormState,
} from "shared/business/create-business-form/form-contact/index";
import { IContacts } from "shared/business/create-business-form/types/create-business.interface";
import Modal from "antd/es/modal/Modal";

interface IContactsProps {
	values: Array<IContacts>;
	contactData: { [key: string]: FormData };
	onSelectAddMenu: () => void;
	setData: React.Dispatch<React.SetStateAction<any>>;
	setFormState: Dispatch<SetStateAction<FormState>>;
	setAddValue: Dispatch<SetStateAction<IContacts>>;
	setEditIndex: Dispatch<SetStateAction<number>>;
}

const Contacts = ({
	values,
	contactData,
	onSelectAddMenu,
	setData,
	setFormState,
	setAddValue,
	setEditIndex,
}: IContactsProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalIndex, setModalIndex] = useState(-1); // Store index of the clicked contact

	const showModal = (index: number) => {
		setModalIndex(index);
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleOnDelete = (deleteIndex: number) => {
		const filteredArray = values.filter(
			(value, index) => index !== deleteIndex
		);
		setData((prev: any) => {
			return { ...prev, contacts: filteredArray };
		});
		setIsModalOpen(false);
		if (filteredArray.length === 0) {
			setFormState("addFiled");
		}
	};
	const handleOnEdit = (editIndex: number) => {
		console.log("index", editIndex);
		setEditIndex(editIndex);
		setAddValue(values[editIndex]);
		setFormState("editFiled");
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
							onClick={() => showModal(index)}
						>
							<SettingOutlined />
						</Button>
					</div>
				);
			})}
			<Modal open={isModalOpen} footer={null} onCancel={closeModal}>
				<div className={styles.modalWrapper}>
					<Button type={"primary"} onClick={() => handleOnEdit(modalIndex)}>
						Редактировать контакт
					</Button>
					<Button type={"dashed"} onClick={() => handleOnDelete(modalIndex)}>
						Удалить контакт
					</Button>
				</div>
			</Modal>
			<Button onClick={onSelectAddMenu}>Добавить</Button>
		</div>
	);
};

export default Contacts;
