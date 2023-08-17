import React, { useEffect } from "react";
import {
	useScanQrPopup,
	useShowPopup,
} from "@vkruglikov/react-telegram-web-app";
import { useTelegram } from "hooks/useTelegram";
import { get } from "services/api";

// export async function loader(): Promise<JsonplaceholderResp> {
// 	const data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
// 		(response) => response.json()
// 	);
// 	console.log("Finish");
// 	return data;
// }

export function Component() {
	const { user, close, tg } = useTelegram();
	const [showQrPopup, closeQrPopup] = useScanQrPopup();
	const showPopup = useShowPopup();

	useEffect(() => {
		tg &&
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
						}>(url, { query: { id: user.id } }).then(async (data) => {
							if (data.status === "authorized") {
								await showPopup({
									message: "Код успешно активирован",
								});
								// .then(close)
								// .catch(close);
								// });
							} else {
								await showPopup({
									message:
										"Код был актвирован ранее, или его срок действия истек. Просканируйте новый код",
								});
								// .then(close)
								// .catch(close);
								// });
							}
						});
						// .catch(async () => {
						// 	await showPopup({
						// 		message:
						// 			"Произошла ошибка, попробуйте позже, или поробуйте просканировать новый код",
						// 	}).then(close);
						// });
					}
				}
			);
	}, [tg]);

	// let data = useLoaderData() as string;
	return <div>Scan code</div>;
}

Component.displayName = "Partners Page";
