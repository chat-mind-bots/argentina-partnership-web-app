import React, { useEffect } from "react";
import { Button, Form, Typography } from "antd";
import {
	WebAppProvider,
	MainButton,
	BackButton,
	useScanQrPopup,
	useShowPopup,
} from "@vkruglikov/react-telegram-web-app";
import { useTelegram } from "hooks/useTelegram";
import { get } from "services/api";

const Partners = () => {
	const { user } = useTelegram();
	const [showQrPopup, closeQrPopup] = useScanQrPopup();
	const showPopup = useShowPopup();
	return (
		<WebAppProvider>
			<MainButton />
			<BackButton />
			<Typography.Title>Сканировать QR код</Typography.Title>
			<button
				onClick={() =>
					showQrPopup(
						{
							text: "Наведите на QR код",
						},
						(text) => {
							closeQrPopup();
							if (text.includes("user-code-")) {
								const code = text.split("user-code-")[1];
								const url = `user-codes/${code}`;
								get<{
									status: "authorized" | "reject";
								}>(url, { query: { id: user.id } })
									.then(async (data) => {
										if (data.status === "authorized") {
											await showPopup({
												message: "Код успешно активирован",
											});
										} else {
											await showPopup({
												message:
													"Код был актвирован ранее, или его срок действия истек. Просканируйте новый код",
											});
										}
										await showPopup({
											message:
												"Произошла ошибка, попробуйте позже, или поробуйте просканировать новый код",
										});
									})
									.catch(async () => {
										await showPopup({
											message:
												"Произошла ошибка, попробуйте позже, или поробуйте просканировать новый код",
										});
									});
							}
						}
					)
				}
			>
				Scan 2.0
			</button>
		</WebAppProvider>
	);
};

export default Partners;
