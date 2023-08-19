import React, { useCallback, useLayoutEffect, useState } from "react";
import {
	MainButton,
	useScanQrPopup,
	useShowPopup,
	WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import { useTelegram } from "hooks/useTelegram";
import { get } from "services/api";
import { Typography } from "antd";
import styles from "./qr-check.module.css";
import InputText from "../components/input/input-text";

export function Component() {
	const { user, onClose, onExpand } = useTelegram();
	const [showQrPopup, closeQrPopup] = useScanQrPopup();
	const showPopup = useShowPopup();
	const [value, setValue] = useState("");
	const [loading, setLoading] = useState(false);

	useLayoutEffect(() => {
		onExpand();
	}, [onExpand]);

	const checkCode = useCallback(
		async (
			code: string
		): Promise<{
			status: "authorized" | "reject";
		}> => {
			const url = `user-codes/${code}`;
			setLoading(true);
			return await get<{
				status: "authorized" | "reject";
			}>(url, { query: { id: user.id } }).then((data) => {
				setLoading(false);
				return data;
			});
		},
		[user.id]
	);

	const sendPopupByResult = useCallback(
		async (result: "authorized" | "reject") => {
			if (result === "authorized") {
				await showPopup({
					message: "Код успешно активирован",
				})
					.then(onClose)
					.catch(onClose);
			} else {
				await showPopup({
					message:
						"Код был актвирован ранее, или его срок действия истек. Просканируйте новый код",
				})
					.then(onClose)
					.catch(onClose);
			}
		},
		[onClose, showPopup]
	);

	const checkByValue = useCallback(
		async (value: string) => {
			const { status } = await checkCode(value);
			await sendPopupByResult(status);
		},
		[checkCode, sendPopupByResult]
	);

	const scanCode = useCallback(() => {
		showQrPopup(
			{
				text: "Наведите на QR код",
			},
			(text) => {
				closeQrPopup();
				if (text.includes("user-code-")) {
					checkCode(text.split("user-code-")[1]).then(async (data) => {
						await sendPopupByResult(data.status);
					});
				}
			}
		);
	}, [showQrPopup, closeQrPopup, checkCode, sendPopupByResult]);

	const handleInput = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setValue(event.target.value);
		},
		[]
	);

	return (
		<WebAppProvider
			options={{
				smoothButtonsTransition: true,
			}}
		>
			<div className={styles.body}>
				<Typography.Title level={2} className={styles.title}>
					Отсканируйте QR-код или введите код в поле ниже
				</Typography.Title>
				<InputText
					className={styles.input}
					value={value}
					onChange={handleInput}
					type={"standard"}
					placeholder={"Введите код"}
				/>
				<div className={styles.description}>
					<div className={styles.descriptionTitle}>Пример:</div>
					<div>SaUMN9</div>
				</div>
			</div>

			<MainButton
				onClick={value ? () => checkByValue(value) : scanCode}
				text={value ? "Проверить код" : "Сканировать QR-код"}
				progress={loading}
			/>
		</WebAppProvider>
	);
}

Component.displayName = "Partners Page";
