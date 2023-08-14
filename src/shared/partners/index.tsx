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
import { JsonplaceholderResp } from "shared/business/data";
import { useLoaderData } from "react-router-dom";

// export async function loader(): Promise<JsonplaceholderResp> {
// 	const data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
// 		(response) => response.json()
// 	);
// 	console.log("Finish");
// 	return data;
// }

export function Component() {
	const { user } = useTelegram();
	const [showQrPopup, closeQrPopup] = useScanQrPopup();
	const showPopup = useShowPopup();

	let data = useLoaderData() as string;
	return (
		<WebAppProvider>
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
}

Component.displayName = "Partners Page";
