import React, { useCallback, useLayoutEffect, useState } from "react";
import {
	MainButton,
	useScanQrPopup,
	useShowPopup,
	WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import { useTelegram } from "hooks/useTelegram";
import { get } from "services/api";
import styles from "shared/qr-code/qr-check/qr-check.module.css";
import InputText from "shared/components/input/input-text";
import ContentLayout from "shared/components/content-layout";

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
			}>(url, { query: { userId: user.id } }).then((data) => {
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
				});
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
			<ContentLayout
				headerPrimary={"Отсканируйте QR-код или введите код в поле ниже"}
			>
				<InputText
					value={value}
					onChange={handleInput}
					type={"standard"}
					placeholder={"Введите код"}
					description={
						<div className={styles.description}>
							<div className={styles.descriptionTitle}>Пример:</div>
							<div>SaUMN9</div>
						</div>
					}
				/>
			</ContentLayout>

			<MainButton
				onClick={value ? () => checkByValue(value) : scanCode}
				text={value ? "Проверить код" : "Сканировать QR-код"}
				progress={loading}
			/>
		</WebAppProvider>
	);
}

Component.displayName = "Partners Page";
