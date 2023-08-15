import React, { useEffect, useState } from "react";
import styles from "shared/business/create-business-form/business-form.module.css";
import {
	ContactsTypeEnum,
	IContacts,
} from "shared/business/create-business-form/types/create-business.interface";
import Contacts from "shared/business/create-business-form/form-contact/contacts";
import AddContact from "shared/business/create-business-form/form-contact/add-contact";
import EditContact from "shared/business/create-business-form/form-contact/edit-contact";

export interface FormContactProps {
	currentStep: number;
	maxSteps: number;
	values: Array<IContacts>;
	hideButtonsCallback?: (value: boolean) => void;
	setData: React.Dispatch<React.SetStateAction<any>>;
}

export interface FormData {
	icon: React.ReactNode;
	placeholder: string;
	title: string;
}

export type FormState = "data" | "addFiled" | "editFiled";

const FormContact = ({
	currentStep,
	maxSteps,
	values,
	hideButtonsCallback,
	setData,
}: FormContactProps) => {
	const isEmptyValues = values.length === 0;
	const [formState, setFormState] = useState<FormState>(
		isEmptyValues ? "addFiled" : "data"
	);
	const [editIndex, setEditIndex] = useState(0);
	const optionOnChange = (value: ContactsTypeEnum) => {
		onSelectType(value);
	};
	const [addValue, setAddValue] = useState<IContacts>({
		value: "",
		type: ContactsTypeEnum.TELEGRAM_BOT,
	});
	const onSelectType = (type: ContactsTypeEnum) => {
		setAddValue(() => ({
			value: "",
			type,
		}));
	};
	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setAddValue((prev: IContacts) => ({
			...prev,
			value,
		}));
	};
	const clearInputs = () => {
		setFormState("data");
		setAddValue({ value: "", type: ContactsTypeEnum.TELEGRAM });
		// setSelectOption("");
	};
	const onSave = () => {
		const copyValues = [...values];
		copyValues.push(addValue);
		setData((prev: any) => {
			return { ...prev, contacts: copyValues };
		});
		clearInputs();
	};
	const onSaveEdit = (index: number) => {
		let copyValues = [...values];
		copyValues[index] = {
			type: addValue.type,
			value: addValue.value,
		};
		setData((prev: any) => {
			return { ...prev, contacts: copyValues };
		});
		clearInputs();
	};
	const onSelectAddMenu = () => {
		setFormState("addFiled");
	};
	const contactData: { [key: string]: FormData } = {
		tg_username: {
			icon: <div className={styles.contactBefore}>@</div>,
			placeholder: "Юзернейм",
			title: "Телеграм",
		},
		tg_bot: { icon: <div>@</div>, placeholder: "Никнейм", title: "Телеграм" },
		tg_channel: {
			icon: <div>@</div>,
			placeholder: "Юзернейм или ссылка",
			title: "Телеграм канал",
		},
		website: {
			icon: <div>https://</div>,
			placeholder: "Адрес сайта",
			title: "Вебсайт",
		},
		phone: {
			icon: <div>+</div>,
			placeholder: "Номер телефона",
			title: "Мобильный телефон",
		},
		whatsapp: {
			icon: <div>+</div>,
			placeholder: "Номер телефона",
			title: "WhatsApp",
		},
	};
	useEffect(() => {
		if (hideButtonsCallback) {
			if (formState === "data") {
				hideButtonsCallback(false);
				return;
			}
			hideButtonsCallback(true);
		}
	}, [formState]);
	return (
		<div>
			<div className={styles.headerWrapper}>
				<h2>Введите описание бизнеса:</h2>
				<div className={styles.stepper}>
					{`${currentStep + 1} / ${maxSteps}`}
				</div>
			</div>
			{formState === "data" && (
				<Contacts
					contactData={contactData}
					values={values}
					onSelectAddMenu={onSelectAddMenu}
					setData={setData}
					setFormState={setFormState}
					setAddValue={setAddValue}
					setEditIndex={setEditIndex}
				/>
			)}
			{formState === "addFiled" && (
				<AddContact
					contactData={contactData}
					addValue={addValue}
					onChangeInput={onChangeInput}
					optionOnChange={optionOnChange}
					onSave={onSave}
				/>
			)}
			{formState === "editFiled" && (
				<EditContact
					editIndex={editIndex}
					contactData={contactData}
					onSave={onSaveEdit}
					optionOnChange={optionOnChange}
					onChangeInput={onChangeInput}
					addValue={addValue}
				/>
			)}
		</div>
	);
};

export default FormContact;
