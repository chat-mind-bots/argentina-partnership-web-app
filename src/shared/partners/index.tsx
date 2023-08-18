import React, { useCallback, useLayoutEffect } from "react";
import {
	MainButton,
	useScanQrPopup,
	useShowPopup,
	WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import { useTelegram } from "hooks/useTelegram";
import { get } from "services/api";
import { Typography } from "antd";

// export async function loader(): Promise<JsonplaceholderResp> {
// 	const data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
// 		(response) => response.json()
// 	);
// 	console.log("Finish");
// 	return data;
// }

export function Component() {
	const { user, onClose } = useTelegram();
	const [showQrPopup, closeQrPopup] = useScanQrPopup();
	const showPopup = useShowPopup();

	// useEffect(() => {
	//
	// }, []);

	// let data = useLoaderData() as string;

	useLayoutEffect(() => {
		startScan();
	}, []);
	const startScan = useCallback(() => {
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
						})
						.catch(async (error) => {
							await showPopup({
								message:
									"Произошла ошибка, попробуйте позже, или поробуйте просканировать новый код",
							}).then(onClose);
						});
				}
			}
		);
	}, [showPopup, closeQrPopup, onClose, showQrPopup]);

	return (
		<WebAppProvider
			options={{
				smoothButtonsTransition: true,
			}}
		>
			<Typography>Отсканируйте QR-Код</Typography>
			<MainButton onClick={startScan} text={"Сканировать QR-код"} />
		</WebAppProvider>
	);
}

Component.displayName = "Partners Page";
