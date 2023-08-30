import React, { useEffect, useState } from "react";
import styles from "shared/business/components/create-business-form/business-form.module.css";
import {
	ContactsTypeEnum,
	IContacts,
} from "shared/business/interfaces/create-business.interface";
import Contacts from "shared/business/components/create-business-form/form-contact/contacts";
import AddContact from "shared/business/components/create-business-form/form-contact/add-contact";
import EditContact from "shared/business/components/create-business-form/form-contact/edit-contact";
import StepCounter from "shared/components/step-counter";
import ContentLayout from "shared/components/content-layout";

export interface FormContactProps {
	currentStep: number;
	maxSteps: number;
	values: Array<IContacts>;
	hideButtonsCallback?: (value: boolean) => void;
	setData: React.Dispatch<React.SetStateAction<any>>;
	isEmptyCallback: (value: boolean) => void;
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
	isEmptyCallback,
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
		type: ContactsTypeEnum.TELEGRAM,
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
	const handleOnCancel = () => {
		setAddValue({
			value: "",
			type: ContactsTypeEnum.TELEGRAM_BOT,
		});
		setFormState("data");
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
		tg_bot: {
			icon: <div className={styles.contactBefore}>@</div>,
			placeholder: "Никнейм",
			title: "Телеграм бот",
		},
		tg_channel: {
			icon: <div className={styles.contactBefore}>@</div>,
			placeholder: "Юзернейм или ссылка",
			title: "Телеграм канал",
		},
		website: {
			icon: <div className={styles.contactBefore}>https://</div>,
			placeholder: "Адрес сайта",
			title: "Вебсайт",
		},
		phone: {
			icon: <div className={styles.contactBefore}>+</div>,
			placeholder: "Номер телефона",
			title: "Мобильный телефон",
		},
		whatsapp: {
			icon: <div className={styles.contactBefore}>+</div>,
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
	useEffect(() => {
		isEmptyCallback(!values.length);
	}, [isEmptyCallback, values]);

	return (
		<ContentLayout
			headerPrimary={"Введите контактные данные бизнеса:"}
			headerSecondary={
				<StepCounter currentStep={currentStep} maxSteps={maxSteps} />
			}
		>
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
					onCancel={handleOnCancel}
					onSave={onSaveEdit}
					optionOnChange={optionOnChange}
					onChangeInput={onChangeInput}
					addValue={addValue}
				/>
			)}
		</ContentLayout>
	);
};

export default FormContact;
